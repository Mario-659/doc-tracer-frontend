import { Component } from '@angular/core'
import { SpectraGridComponent } from '../spectra-grid/spectra-grid.component'

@Component({
    selector: 'app-spectra-main',
    standalone: true,
    imports: [
        SpectraGridComponent,
    ],
    templateUrl: './spectra-main.component.html',
    styleUrl: './spectra-main.component.scss',
})
export class SpectraMainComponent {}
