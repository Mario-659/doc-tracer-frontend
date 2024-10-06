import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface


interface IRow {
    make: string;
    model: string;
    price: number;
    electric: boolean;
}

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
    // Row Data: The data to be displayed.
    rowData = [
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ];

    // Column Definitions: Defines the columns to be displayed.
    colDefs: ColDef[] = [
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ];

}
