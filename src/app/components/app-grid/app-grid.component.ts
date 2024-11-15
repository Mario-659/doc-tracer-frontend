import { Component, Input } from '@angular/core'
import { ColDef } from 'ag-grid-community'
import { Observable } from 'rxjs'
import { AsyncPipe, NgIf } from '@angular/common'
import { AgGridAngular } from 'ag-grid-angular'
import { iconSetQuartzLight, themeQuartz } from '@ag-grid-community/theming'
import { GridOptions } from '@ag-grid-community/core'

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

    constructor() {
    }


    myTheme = themeQuartz
        .withPart(iconSetQuartzLight)
        .withParams({
            backgroundColor: '#ffffff',
            browserColorScheme: 'light',
            columnBorder: false,
            fontFamily: {
                googleFont: 'Arial',
            },
            foregroundColor: 'rgb(46, 55, 66)',
            headerBackgroundColor: '#F9FAFB',
            headerFontSize: 14,
            headerFontWeight: 600,
            headerTextColor: '#919191',
            oddRowBackgroundColor: '#F9FAFB',
            rowBorder: false,
            sidePanelBorder: false,
            spacing: 8,
            wrapperBorder: false,
            wrapperBorderRadius: 0,
        })

    gridOptions = {
        'theme': this.myTheme
    }
}
