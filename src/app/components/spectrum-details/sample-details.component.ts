import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, switchMap } from 'rxjs'
import { DataService } from '../../services/data.service'
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common'
import { NotificationService } from '../../services/notification.service'
import { AppNotification, NotificationType } from '../../models/notification'
import { Sample } from '../../models/api/sample'
import { Chart, registerables  } from 'chart.js'

Chart.register(...registerables);

@Component({
    selector: 'app-sample-details',
    standalone: true,
    imports: [NgIf, AsyncPipe, JsonPipe, DatePipe],
    templateUrl: './sample-details.component.html',
    styleUrl: './sample-details.component.scss',
})
export class SampleDetailsComponent implements OnInit {
    sample$: Observable<Sample | undefined> | undefined
    showProperties = true;
    showSpectralData = true;
    showChart = false;
    chart: Chart | undefined;

    protected readonly JSON = JSON

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService,
        private notificationService: NotificationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.sample$ = this.route.paramMap.pipe(
            switchMap((params) => this.dataService.getSample(Number(params.get('id'))))
        )
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

    // TODO add option to change delimiter and dot to comma for float numbers
    private convertJsonToCsv(dataPoints: { wavelength: number; intensity: number }[]): string {
        const csvHeaders = ['Wavelength,Intensity'];
        const csvRows = dataPoints.map(point => `${point.wavelength},${point.intensity}`);
        return [csvHeaders.join('\n'), ...csvRows].join('\n');
    }



    editSample(id: number): void {
        this.router.navigate([`/samples/${id}/edit`]);
    }


    deleteSample(id: number): void {
        this.dataService.deleteSample(id).subscribe({
            next: () => {
                this.notificationService.showNotification(
                    new AppNotification(`Sample with ID ${id} deleted successfully`, NotificationType.success)
                );
                this.router.navigate(['/samples']);
            },
        });
    }

    toggleProperties() {
        this.showProperties = !this.showProperties;
    }

    toggleSpectralData() {
        this.showSpectralData = !this.showSpectralData;
    }

    toggleChart(sample: Sample): void {
        this.showChart = !this.showChart;

        if (this.showChart) {
            this.renderChart(sample.spectralData)
        } else {
            this.destroyChart();
        }
    }

    private renderChart(spectralData: any): void {
        spectralData = JSON.parse(spectralData)
        const labels = spectralData.map((point: { wavelength: number }) => point.wavelength);
        const data = spectralData.map((point: { intensity: number }) => point.intensity);

        const ctx = document.getElementById('spectralDataChart') as HTMLCanvasElement;

        console.log(ctx)

        if (this.chart) {
            this.chart.destroy();
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
                        borderWidth: 1
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
        }
    }
}
