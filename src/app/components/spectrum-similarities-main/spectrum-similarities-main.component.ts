import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Sample } from '../../models/api/sample'
import { DataService } from '../../services/data.service'
import { FormsModule } from '@angular/forms'
import { NgForOf } from '@angular/common'

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
        console.log('update chart called')
        if (!this.selectedSample1 || !this.selectedSample2) {
            return;
        }

        console.log('Sample 1:', JSON.stringify(this.selectedSample1, null, 2));
        console.log('Sample 2:', JSON.stringify(this.selectedSample2, null, 2));

        const labels1 = this.extractWavelengths(this.selectedSample1);
        const data1 = this.extractIntensities(this.selectedSample1);

        const labels2 = this.extractWavelengths(this.selectedSample2);
        const data2 = this.extractIntensities(this.selectedSample2);

        const labels = Array.from(new Set([...labels1, ...labels2])).sort((a, b) => a - b);

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart('spectrumComparisonChart', {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: this.selectedSample1.name,
                        data: this.mapDataToLabels(labels, labels1, data1),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.3,
                        pointRadius: 2,
                    },
                    {
                        label: this.selectedSample2.name,
                        data: this.mapDataToLabels(labels, labels2, data2),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        tension: 0.3,
                        pointRadius: 2,
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

    extractWavelengths(sample: Sample): number[] {
        console.log(sample)
        return JSON.parse(sample.spectralData).map((dp: any) => dp.wavelength);
    }

    extractIntensities(sample: Sample): number[] {
        return JSON.parse(sample.spectralData).map((dp: any) => dp.intensity);
    }

    mapDataToLabels(labels: number[], sampleLabels: number[], sampleData: number[]): number[] {
        const dataMap = sampleLabels.reduce((acc, wavelength, index) => {
            acc[wavelength] = sampleData[index];
            return acc;
        }, {} as Record<number, number>);

        return labels.map((label) => dataMap[label] || 0);
    }
}

