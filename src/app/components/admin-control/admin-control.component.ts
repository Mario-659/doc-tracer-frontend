import { Component, OnInit } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { AppGridComponent } from '../app-grid/app-grid.component'
import { ColDef } from 'ag-grid-community'
import { DataService } from '../../services/data.service'
import { Observable } from 'rxjs'
import { UserResponse } from '../../models/api/user-response'
import { Role } from '../../models/User'
import { GridApi, GridReadyEvent } from '@ag-grid-community/core'
import { AsyncPipe, NgIf } from '@angular/common'

@Component({
  selector: 'app-admin-control',
  standalone: true,
    imports: [
        AgGridAngular,
        AppGridComponent,
        NgIf,
        AsyncPipe,
    ],
  templateUrl: './admin-control.component.html',
  styleUrl: './admin-control.component.scss'
})
export class AdminControlComponent implements OnInit {
    $users: Observable<UserResponse[]> | undefined
    private gridApi: GridApi<any> | undefined
    private gridColumnApi: any

    protected modified: boolean = false

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.$users = this.dataService.getUsers()
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    onCellValueChanged(event: any) {
        this.modified = true
        console.log(event.data)
        event.data.modified = true;
    }

    saveModifiedRows() {
        const allRowData: any = [];
        this.gridApi?.forEachNode(node => allRowData.push(node.data));
        const modifiedRows = allRowData.filter((row: any) => row['modified']);

        console.log(modifiedRows)
    }

    roleColumns: ColDef[] = Object.keys(Role).map(role => ({
        field: role.toLowerCase(),
        cellRenderer: 'agCheckboxCellRenderer',
        cellRendererParams: {
            checkbox: true,
        },
        editable: true,
        flex: 1,
    }));

    colDefs: ColDef[] = [
        {
            headerName: 'Id',
            field: 'id',
            filter: 'agNumberColumnFilter',
            flex: 1,
        },
        {
            headerName: 'Username',
            field: 'username',
            filter: 'agTextColumnFilter',
            flex: 2,
        },
        {
            headerName: 'Email',
            field: 'email',
            filter: 'agTextColumnFilter',
            flex: 2,
        },
        ...this.roleColumns,
        {
            headerName: 'Is Active',
            field: 'isActive',
            cellRenderer: 'agCheckboxCellRenderer',
            editable: true,
            flex: 1,
        },
        {
            headerName: 'Last Login',
            field: 'lastLogin',
            filter: 'agDateColumnFilter',
            valueFormatter: this.formatDate,
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
        }
    ];

    formatDate(params: any): string {
        const date = new Date(params.value)
        return date.toLocaleString()
    }
}
