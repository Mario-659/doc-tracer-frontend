import { Component } from '@angular/core'
import { DatePipe, NgForOf } from '@angular/common'


// npm install ng2-charts chart.js// import { BaseChartDirective } from 'ng2-charts'
// import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
// Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        DatePipe,
        NgForOf,
        // BaseChartDirective,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    totalSpectra = 1234;
    totalSamples = 567;
    totalUsers = 23;
    totalDevices = 89;

    userName = 'Alice';
    userRole = 'Admin';

    recentActivities = [
        { description: 'Added new spectrum data', date: new Date(), user: 'Alice' },
        { description: 'Updated sample information', date: new Date(), user: 'Bob' },
        { description: 'Deleted old spectrum', date: new Date(), user: 'Charlie' },
    ];

    // chartData: ChartData<'line'> = {
    //     labels: ['400 nm', '450 nm', '500 nm', '550 nm', '600 nm', '650 nm', '700 nm'],
    //     datasets: [
    //         {
    //             label: 'Intensity',
    //             data: [0.2, 0.3, 0.5, 0.7, 0.6, 0.4, 0.2],
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //         },
    //     ],
    // };
    //
    // chartOptions: ChartOptions = {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             position: 'top',
    //         },
    //     },
    //     scales: {
    //         x: {
    //             title: {
    //                 display: true,
    //                 text: 'Wavelength (nm)',
    //             },
    //         },
    //         y: {
    //             title: {
    //                 display: true,
    //                 text: 'Intensity',
    //             },
    //         },
    //     },
    // };
    //
    // chartLabels: string[] = ['400 nm', '450 nm', '500 nm', '550 nm', '600 nm', '650 nm', '700 nm'];
}
