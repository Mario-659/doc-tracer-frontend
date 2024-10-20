import { Component, OnInit } from '@angular/core'
import { SpectraGridComponent } from '../spectra-grid/spectra-grid.component'
import { Router } from '@angular/router'
import { AppGridComponent } from '../app-grid/app-grid.component'
import { Observable } from 'rxjs'
import { SpectrumGridRow } from '../../models/spectrum-grid-row'
import { DataService } from '../../services/data.service'
import { ColDef } from 'ag-grid-community'

@Component({
    selector: 'app-spectra-main',
    standalone: true,
    imports: [
        SpectraGridComponent,
        AppGridComponent,
    ],
    templateUrl: './spectra-main.component.html',
    styleUrl: './spectra-main.component.scss',
})
export class SpectraMainComponent implements OnInit {
    $spectra: Observable<SpectrumGridRow[]> | undefined

    constructor(
        private router: Router,
        private dataService: DataService
    ) {}

    ngOnInit() {
        this.$spectra = this.dataService.getSpectra()
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
