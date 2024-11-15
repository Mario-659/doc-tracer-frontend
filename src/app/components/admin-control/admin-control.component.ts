import { Component, OnInit } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { AppGridComponent } from '../app-grid/app-grid.component'
import { ColDef } from 'ag-grid-community'
import { DataService } from '../../services/data.service'
import { Observable } from 'rxjs'
import { UserResponse } from '../../models/api/user-response'

@Component({
  selector: 'app-admin-control',
  standalone: true,
    imports: [
        AgGridAngular,
        AppGridComponent,
    ],
  templateUrl: './admin-control.component.html',
  styleUrl: './admin-control.component.scss'
})
export class AdminControlComponent implements OnInit {
    $users: Observable<UserResponse[]> | undefined

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.$users = this.dataService.getUsers()
    }


    colDefs: ColDef[] = [
        {
            headerName: 'Id',
            field: 'id',
            filter: 'agNumberColumnFilter',
        },
        {
            headerName: 'username',
            field: 'username',
            filter: 'agTextColumnFilter',
        },
        {
            headerName: 'Email',
            field: 'email',
            filter: 'agTextColumnFilter',
        },
        {
            headerName: 'Is Active',
            field: 'isActive',
            cellDataType: 'boolean',
            // filter: 'agTextColumnFilter',
        },
        {
            headerName: 'Last Login',
            field: 'lastLogin',
            filter: 'agDateColumnFilter',
            valueFormatter: this.formatDate,
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
