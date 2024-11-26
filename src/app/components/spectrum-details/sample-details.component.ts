import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { DataService } from '../../services/data.service';
import { tap } from 'rxjs/operators';
import { Sample } from '../../models/api/sample';
import { Chart, registerables } from 'chart.js';
import { AsyncPipe, DatePipe, JsonPipe, NgForOf, NgIf } from '@angular/common'
import { AppNotification, NotificationType } from '../../models/notification'
import { NotificationService } from '../../services/notification.service'
import { Modal } from 'bootstrap'

Chart.register(...registerables);

@Component({
    selector: 'app-sample-details',
    standalone: true,
    imports: [NgIf, AsyncPipe, JsonPipe, DatePipe, NgForOf],
    templateUrl: './sample-details.component.html',
    styleUrl: './sample-details.component.scss',
})
export class SampleDetailsComponent implements OnInit, AfterViewChecked {
    sample$: Observable<Sample | undefined> | undefined;
    private sampleData: Sample | null = null;
    chart: Chart | undefined;
    confirmationModal: any;

    protected readonly JSON = JSON

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService,
        private router: Router,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.sample$ = this.route.paramMap.pipe(
            switchMap((params) =>
                this.dataService.getSample(Number(params.get('id')))
            ),
            tap((sample) => {
                this.sampleData = sample;
                this.destroyChart();
            })
        );
    }

    ngAfterViewChecked(): void {
        const ctx = document.getElementById('spectralDataChart') as HTMLCanvasElement;
        if (this.sampleData && ctx && !this.chart) {
            this.renderChart(this.sampleData);
        }
    }

    // TODO add option to change delimiter and dot to comma for float numbers
    private convertJsonToCsv(dataPoints: { wavelength: number; intensity: number }[]): string {
        const csvHeaders = ['Wavelength,Intensity'];
        const csvRows = dataPoints.map(point => `${point.wavelength},${point.intensity}`);
        return [csvHeaders.join('\n'), ...csvRows].join('\n');
    }

    downloadSampleData(sample: Sample, format: 'json' | 'csv'): void {
        let data = '', filename = ''
        if (format === 'json') {
            data = 'data:text/json;charset=utf-8,' + encodeURIComponent(sample.spectralData);
            filename = `sample_${sample.id}_spectral_data.json`
        } else if (format === 'csv') {
            const jsonData = JSON.parse(sample.spectralData);
            const csvData = this.convertJsonToCsv(jsonData);
            data = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData);
            filename = `sample_${sample.id}_spectral_data.csv`
        }

        this.downloadFile(data, filename)
    }

    private downloadFile(data: string, filename: string) {
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', data);
        downloadAnchorNode.setAttribute('download', filename);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    editSample(id: number): void {
        this.router.navigate([`/samples/${id}/edit`]);
    }


    deleteSample(id: number): void {
        const confirmationModalElement = document.getElementById('confirmationModal');
        if (confirmationModalElement) {
            this.confirmationModal = new Modal(confirmationModalElement);
            this.confirmationModal.show();
        }
    }

    confirmDelete(id: number): void {
        this.dataService.deleteSample(id).subscribe({
            next: () => {
                this.notificationService.showNotification(
                    new AppNotification(`Sample with ID ${id} deleted successfully`, NotificationType.success)
                );
                this.confirmationModal.hide();
                this.router.navigate(['/samples']);
            },
        });
    }

    private renderChart(sample: Sample): void {
        const spectralData = JSON.parse(sample.spectralData);
        const labels = spectralData.map((point: { wavelength: number }) => point.wavelength);
        const data = spectralData.map((point: { intensity: number }) => point.intensity);

        const ctx = document.getElementById('spectralDataChart') as HTMLCanvasElement;

        if (!ctx) {
            console.error('Canvas element not found.');
            return;
        }

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Spectral Intensity',
                        data,
                        tension: 0.3,
                        pointRadius: 1,
                        borderWidth: 1,
                        borderColor: 'rgba(75, 192, 192, 1)',
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Wavelength (nm)',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Intensity',
                        },
                    },
                },
            },
        });
    }

    private destroyChart(): void {
        if (this.chart) {
            this.chart.destroy();
            this.chart = undefined;
        }
    }

    closeModal() {
        this.confirmationModal.hide();
    }
}
