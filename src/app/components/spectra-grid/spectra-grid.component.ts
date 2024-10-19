import { Component, OnInit } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { SpectrumGridRow } from '../../models/spectrum-grid-row'
import { DataService } from '../../services/data.service'
import { AsyncPipe, NgIf } from '@angular/common'

@Component({
  selector: 'app-spectra-grid',
  standalone: true,
    imports: [
        AgGridAngular,
        NgIf,
        AsyncPipe,
    ],
  templateUrl: './spectra-grid.component.html',
  styleUrl: './spectra-grid.component.scss'
})
export class SpectraGridComponent implements OnInit {
    $rowData: Observable<SpectrumGridRow[]> | undefined

    constructor(
        private router: Router,
        private dataService: DataService
    ) {}

    ngOnInit() {
        this.$rowData = this.dataService.getSpectra()
    }

    goSpectrumDetails(spectrumId: number) {
        this.router.navigate([`spectra/${spectrumId}`])
    }


    colDefs: ColDef[] = [
        {
            headerName: "Id",
            field: "id",
            filter: "agNumberColumnFilter",
            onCellClicked: (event) => this.goSpectrumDetails(event.data.id),
            cellClass: ['link-primary']
        },
        {
            headerName: "Measurement Date",
            field: "measurementDate",
            filter: "agDateColumnFilter",
            valueFormatter: this.formatDate
        },
        {
            headerName: "Spectrum Type",
            field: "spectrumType",
            filter: "agTextColumnFilter"
        },
        {
            headerName: "Sample Id",
            field: "sampleId",
            filter: "agNumberColumnFilter"
        },
        {
            headerName: "Created By",
            field: "createdBy",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Created At",
            field: "createdAt",
            filter: "agDateColumnFilter",
            valueFormatter: this.formatDate
        }
    ];

    formatDate(params: any): string {
        const date = new Date(params.value);
        return date.toLocaleString();
    }
}
