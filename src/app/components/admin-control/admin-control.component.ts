import { Component, OnInit } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { AppGridComponent } from '../app-grid/app-grid.component'
import { ColDef } from 'ag-grid-community'
import { DataService } from '../../services/data.service'
import { map, Observable } from 'rxjs'
import { UserResponse } from '../../models/api/user-response'
import { Role } from '../../models/User'
import { GridApi, GridReadyEvent } from '@ag-grid-community/core'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-admin-control',
  standalone: true,
    imports: [
        AgGridAngular,
        AppGridComponent,
        NgIf,
        AsyncPipe,
        NgForOf,
    ],
  templateUrl: './admin-control.component.html',
  styleUrl: './admin-control.component.scss'
})
export class AdminControlComponent implements OnInit {
    $users: Observable<UserResponse[]> | undefined
    private gridApi: GridApi<any> | undefined

    protected modified: boolean = false
    protected pendingChanges: any[] = [];

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadData()
    }

    loadData() {
        this.$users = this.dataService.getUsers().pipe(
            map(users =>
                users.map(user => ({
                    ...user,
                    admin: user.roles.includes('ADMIN'),
                    viewer: user.roles.includes('VIEWER'),
                    editor: user.roles.includes('EDITOR'),
                }))
            )
        );
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
    }

    onCellValueChanged(event: any) {
        this.modified = true
        console.log(event.data)
        event.data.modified = true;
    }

    saveModifiedRows() {
        const allRowData: any[] = [];
        this.gridApi?.forEachNode(node => allRowData.push(node.data));

        const modifiedRows = allRowData.filter((row: any) => row['modified']);

        if (modifiedRows.length === 0) {
            console.log("No changes to save.");
            return;
        }

        this.pendingChanges = modifiedRows.map(row => ({
            id: row.id,
            roles: Object.keys(Role)
                .filter(role => row[role.toLowerCase()])
                .map(role => role.toUpperCase()),
            isActive: row.active,
        }));

        const confirmationModalElement = document.getElementById('confirmationModal');
        if (confirmationModalElement) {
            const confirmationModal = new Modal(confirmationModalElement);
            confirmationModal.show();
        }
    }


    confirmSave() {
        this.dataService.updateUsers(this.pendingChanges).subscribe({
            next: (response) => {
                this.modified = false;
                this.pendingChanges = [];
                this.$users = this.dataService.getUsers(); // Refresh the data
            },
            error: (error) => {
                console.error("Error saving changes:", error);
            },
        });

        const confirmationModalElement = document.getElementById('confirmationModal');
        if (confirmationModalElement) {
            const confirmationModal = new Modal(confirmationModalElement);
            confirmationModal.hide();
        }

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
            field: 'active',
            cellRenderer: 'agCheckboxCellRenderer',
            editable: true,
            cellRendererParams: {
                checkbox: true,
            },
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
