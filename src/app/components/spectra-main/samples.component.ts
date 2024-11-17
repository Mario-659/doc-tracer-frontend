import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AppGridComponent } from '../app-grid/app-grid.component'
import { Observable } from 'rxjs'
import { DataService } from '../../services/data.service'
import { ColDef } from 'ag-grid-community'
import { Sample } from '../../models/api/sample'

@Component({
    selector: 'app-samples',
    standalone: true,
    imports: [AppGridComponent],
    templateUrl: './samples.component.html',
    styleUrl: './samples.component.scss',
})
export class SamplesComponent implements OnInit {
    $spectra: Observable<Sample[]> | undefined

    constructor(
        private router: Router,
        private dataService: DataService
    ) {}

    ngOnInit() {
        this.$spectra = this.dataService.getSamples()
    }

    goSampleDetails(sample: number) {
        this.router.navigate([`samples/${sample}`])
    }

    colDefs: ColDef[] = [
        {
            headerName: 'Id',
            field: 'id',
            filter: 'agNumberColumnFilter',
            onCellClicked: (event) => this.goSampleDetails(event.data.id),
            cellClass: ['link-primary'],
            flex: 1,
        },
        // {
        //     headerName: 'Measurement Date',
        //     field: 'measurementDate',
        //     filter: 'agDateColumnFilter',
        //     valueFormatter: this.formatDate,
        //     flex: 2,
        // },
        {
            headerName: 'Spectrum Type',
            field: 'type',
            filter: 'agTextColumnFilter',
            flex: 1,
        },
        {
            headerName: 'Sample Name',
            field: 'name',
            filter: 'agTextColumnFilter',
            flex: 2,
        },
        {
            headerName: 'Created At',
            field: 'createdAt',
            filter: 'agDateColumnFilter',
            valueFormatter: this.formatDate,
            flex: 2,
        },
        {
            headerName: 'Updated At',
            field: 'updatedAt',
            filter: 'agDateColumnFilter',
            valueFormatter: this.formatDate,
            flex: 2,
        },
    ];

    formatDate(params: any): string {
        const date = new Date(params.value)
        return date.toLocaleString()
    }
}
