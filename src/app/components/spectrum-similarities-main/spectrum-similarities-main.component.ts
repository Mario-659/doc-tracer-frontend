import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'
import { Sample } from '../../models/api/sample'
import { DataService } from '../../services/data.service'
import { FormsModule } from '@angular/forms'
import { DatePipe, NgForOf, NgIf } from '@angular/common'
import { Measurement } from '../../models/api/measurement'
import { forkJoin } from 'rxjs'

Chart.register(...registerables);

@Component({
    selector: 'app-spectrum-similarities-main',
    standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        DatePipe,
        NgIf,
    ],
    templateUrl: './spectrum-similarities-main.component.html',
    styleUrl: './spectrum-similarities-main.component.scss',
})
export class SpectrumSimilaritiesMainComponent implements OnInit {
    measurements: Measurement[] = [];
    availableSamples: Sample[] = [];
    selectedSamples: Sample[] = [];
    loadedSamples: Sample[] = []
    selectedMeasurement: Measurement | null = null;
    chart: Chart | null = null;

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.loadMeasurements();
    }

    loadMeasurements(): void {
        this.dataService.getMeasurements().subscribe((measurements) => {
            this.measurements = measurements;
        });
    }

    onMeasurementChange(): void {
        if (this.selectedMeasurement) {
            // update to get by measurement id
            this.dataService.getSamples().subscribe((samples) => {
                this.availableSamples = samples;
                this.selectedSamples = [];
                this.updateChart();
            });
        }
    }

    addEmptySample(): void {
        // @ts-ignore
        this.selectedSamples.push(null);
    }

    removeSample(index: number): void {
        this.selectedSamples.splice(index, 1);
        this.updateChart();
    }

    updateChart(): void {
        if (this.selectedSamples.length === 0) {
            return;
        }

        forkJoin(
            this.selectedSamples.map(sample => this.dataService.getSample(sample.id))
        ).subscribe(loadedSamples => {
            console.log(loadedSamples)
            const datasets = loadedSamples
                .filter((sample) => sample !== null)
                .map((sample, index) => {
                    const labels = this.extractWavelengths(sample);
                    const data = this.extractIntensities(sample);

                    return {
                        label: `Sample ${index + 1}: ${sample.name}`,
                        data: this.mapToChartData(this.getAllLabels(loadedSamples), labels, data),
                        fill: false,
                        pointRadius: 1,
                        borderWidth: 1
                    };
                });

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new Chart('chartCanvas', {
                type: 'line',
                data: {
                    labels: this.getAllLabels(loadedSamples),
                    datasets,
                },
                options: {
                    responsive: true,
                },
            });
        })
    }

    extractWavelengths(sample: Sample): number[] {
        console.log(sample)
        return JSON.parse(sample.spectralData).map((dp: any) => dp.wavelength);
    }

    extractIntensities(sample: Sample): number[] {
        return JSON.parse(sample.spectralData).map((dp: any) => dp.intensity);
    }

    mapToChartData(allLabels: number[], sampleLabels: number[], sampleData: number[]): any {
        const dataMap = new Map<number, number>();
        sampleLabels.forEach((label, index) => dataMap.set(label, sampleData[index]));

        return allLabels.map((label) => dataMap.get(label) || null);
    }

    getAllLabels(samples: Sample[]): number[] {
        const allLabels = samples
            .filter((sample) => sample !== null)
            .flatMap((sample) => this.extractWavelengths(sample));
        return Array.from(new Set(allLabels)).sort((a, b) => a - b);
    }
}
