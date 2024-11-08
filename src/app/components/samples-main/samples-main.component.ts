import { Component, OnInit } from '@angular/core'
import { AppGridComponent } from '../app-grid/app-grid.component'
import { Observable } from 'rxjs'
import { Sample } from '../../models/api/sample'
import { DataService } from '../../services/data.service'
import { ColDef } from 'ag-grid-community'

@Component({
    selector: 'app-samples-main',
    standalone: true,
    imports: [AppGridComponent],
    templateUrl: './samples-main.component.html',
    styleUrl: './samples-main.component.scss',
})
export class SamplesMainComponent implements OnInit {
    $samples: Observable<Sample[]> | undefined

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.$samples = this.dataService.getSamples()
    }

    colDefs: ColDef[] = [
        {
            headerName: 'Id',
            field: 'id',
            filter: 'agNumberColumnFilter',
            // onCellClicked: (event) => this.goSpectrumDetails(event.data.id),
            // cellClass: ['link-primary'],
        },
        {
            headerName: 'Description',
            field: 'description',
            filter: 'agTextColumnFilter',
        },
        {
            headerName: 'Covered Material Name',
            field: 'coveredMaterialName',
            filter: 'agTextColumnFilter',
        },
        {
            headerName: 'Covered Material Id',
            field: 'coveredMaterialId',
            filter: 'agNumberColumnFilter',
        },
        {
            headerName: 'Covering Material Name',
            field: 'coveringMaterialName',
            filter: 'agTextColumnFilter',
        },
        {
            headerName: 'Covering Material Id',
            field: 'coveringMaterialId',
            filter: 'agNumberColumnFilter',
        },
        {
            headerName: 'Sample Creation Date',
            field: 'sampleCreationDate',
            filter: 'agTextColumnFilter',
        },
        {
            headerName: 'Created By',
            field: 'createdBy',
            filter: 'agTextColumnFilter',
        },
        {
            headerName: 'Created At',
            field: 'createdAt',
            filter: 'agDateColumnFilter',
            valueFormatter: this.formatDate,
        },
        {
            headerName: 'Updated At',
            field: 'updatedAt',
            filter: 'agDateColumnFilter',
            valueFormatter: this.formatDate,
        },
    ]

    formatDate(params: any): string {
        const date = new Date(params.value)
        return date.toLocaleString()
    }
}
