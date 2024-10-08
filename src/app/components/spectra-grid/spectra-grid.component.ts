import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Router } from '@angular/router'

@Component({
  selector: 'app-spectra-grid',
  standalone: true,
    imports: [
        AgGridAngular,
    ],
  templateUrl: './spectra-grid.component.html',
  styleUrl: './spectra-grid.component.scss'
})
export class SpectraGridComponent {

    constructor(private router: Router) {}

    goSpectrumDetails(spectrumId: number) {
        this.router.navigate([`spectra/details/${spectrumId}`])
    }

    rowData = [
        {
            id: 1,
            measurementDate: "2024-09-25",
            spectrumType: "Infrared",
            sample: "Ink Sample A",
            createdBy: "John Doe"
        },
        {
            id: 2,
            measurementDate: "2024-09-26",
            spectrumType: "UV",
            sample: "Paper Sample B",
            createdBy: "Jane Smith"
        },
        {
            id: 3,
            measurementDate: "2024-09-27",
            spectrumType: "X-Ray",
            sample: "Plastic Sample C",
            createdBy: "Emily White"
        },
        {
            id: 4,
            measurementDate: "2024-09-28",
            spectrumType: "NIR",
            sample: "Fabric Sample D",
            createdBy: "Michael Brown"
        },
        {
            id: 5,
            measurementDate: "2024-09-29",
            spectrumType: "Infrared",
            sample: "Ink Sample E",
            createdBy: "Alice Green"
        }
    ];

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
            filter: "agDateColumnFilter"
        },
        {
            headerName: "Spectrum Type",
            field: "spectrumType",
            filter: "agTextColumnFilter"
        },
        {
            headerName: "Sample",
            field: "sample",
            filter: "agTextColumnFilter"
        },
        {
            headerName: "Created By",
            field: "createdBy",
            filter: "agTextColumnFilter"
        }
    ];
}