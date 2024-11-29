import { Component, Input } from '@angular/core'
import { ColDef } from 'ag-grid-community'
import { Observable } from 'rxjs'
import { AsyncPipe, NgIf } from '@angular/common'
import { AgGridAngular } from 'ag-grid-angular'

@Component({
    selector: 'app-grid',
    standalone: true,
    imports: [NgIf, AsyncPipe, AgGridAngular],
    templateUrl: './app-grid.component.html',
    styleUrl: './app-grid.component.scss',
})
export class AppGridComponent {
    @Input() colDefs: ColDef[] | undefined
    @Input() $rowData: Observable<any> | undefined

    constructor() {}
}
