import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'
import { Sample } from '../../models/api/sample'
import { DataService } from '../../services/data.service'
import { FormsModule } from '@angular/forms'
import { NgForOf } from '@angular/common'
import { forkJoin } from 'rxjs'

Chart.register(...registerables);

@Component({
    selector: 'app-spectrum-similarities-main',
    standalone: true,
    imports: [
        FormsModule,
        NgForOf,
    ],
    templateUrl: './spectrum-similarities-main.component.html',
    styleUrl: './spectrum-similarities-main.component.scss',
})
export class SpectrumSimilaritiesMainComponent implements OnInit {
    samples: Sample[] = [];
    selectedSample1: Sample | null = null;
    selectedSample2: Sample | null = null;
    chart: Chart | null = null;

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.loadSamples();
    }

    loadSamples(): void {
        this.dataService.getSamples().subscribe((samples) => {
            this.samples = samples;
        });
    }

    updateChart(): void {
        if (!this.selectedSample1 || !this.selectedSample2) {
            return;
        }

        // Fetch details for selected samples
        forkJoin([
            this.dataService.getSample(this.selectedSample1.id),
            this.dataService.getSample(this.selectedSample2.id),
        ]).subscribe(([detailedSample1, detailedSample2]) => {
            const labels1 = this.extractWavelengths(detailedSample1);
            const data1 = this.extractIntensities(detailedSample1);

            const labels2 = this.extractWavelengths(detailedSample2);
            const data2 = this.extractIntensities(detailedSample2);

            const labels = Array.from(new Set([...labels1, ...labels2])).sort((a, b) => a - b);

            if (this.chart) {
                this.chart.destroy();
            }

            const ctx = document.getElementById('spectrumComparisonChart') as HTMLCanvasElement;

            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            label: detailedSample1.name,
                            data: this.mapToChartData(labels, labels1, data1),
                            fill: false,
                            pointRadius: 1,
                            borderWidth: 1
                        },
                        {
                            label: detailedSample2.name,
                            data: this.mapToChartData(labels, labels2, data2),
                            fill: false,
                            pointRadius: 1,
                            borderWidth: 1
                        },
                    ],
                },
                options: {
                    responsive: true,
                },
            });
        });
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
}

