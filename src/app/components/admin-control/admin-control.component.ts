import { Component, OnInit } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { AppGridComponent } from '../app-grid/app-grid.component'
import { ColDef } from 'ag-grid-community'
import { DataService } from '../../services/data.service'
import { map, Observable } from 'rxjs'
import { UserResponse } from '../../models/api/user-response'
import { Role } from '../../models/User'
import { GridApi } from '@ag-grid-community/core'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { Modal } from 'bootstrap'
import { NotificationService } from '../../services/notification.service'
import { AppNotification, NotificationType } from '../../models/notification'

// interface PendingChange {
//     userId: string,
//     rolesToAdd: string[],
//     rolesToRemove: string[],
//     activationSwitch:
// }

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
    private confirmationModal: any;

    protected modified: boolean = false
    protected pendingChanges: any[] = [];

    constructor(
        private dataService: DataService,
        private notificationService: NotificationService) { }

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
        const { data } = event;
        const currentRoles = data.roles || [];
        const updatedRoles = Object.keys(Role)
            .filter(role => data[role.toLowerCase()])
            .map(role => role.toUpperCase());

        const rolesToAdd = updatedRoles.filter(role => !currentRoles.includes(role));
        const rolesToRemove = currentRoles.filter((role: any) => !updatedRoles.includes(role));

        const hasRoleChanges = rolesToAdd.length > 0 || rolesToRemove.length > 0;
        const hasActivationChange = data.active !== event.oldValue?.active;

        if (hasRoleChanges || hasActivationChange) {
            const existingChangeIndex = this.pendingChanges.findIndex(change => change.id === data.id);
            if (existingChangeIndex > -1) {
                this.pendingChanges[existingChangeIndex] = {
                    id: data.id,
                    username: data.username,
                    rolesToAdd,
                    rolesToRemove,
                    isActive: data.active,
                };
            } else {
                this.pendingChanges.push({
                    id: data.id,
                    username: data.username,
                    rolesToAdd,
                    rolesToRemove,
                    isActive: data.active,
                });
            }
        } else {
            this.pendingChanges = this.pendingChanges.filter(change => change.id !== data.id);
        }

        this.modified = this.pendingChanges.length > 0;
    }

    saveModifiedRows() {
        const confirmationModalElement = document.getElementById('confirmationModal');
        if (confirmationModalElement) {
            this.confirmationModal = new Modal(confirmationModalElement);
            this.confirmationModal.show();
        }
    }

    confirmSave() {
        this.dataService.updateUsers(this.pendingChanges).subscribe({
            next: () => {
                this.notificationService.showNotification(new AppNotification('Users have been successfully updated', NotificationType.success))
                this.modified = false;
                this.pendingChanges = [];
                this.loadData();
            }
        });

        this.closeModal();
    }

    closeModal() {
        this.confirmationModal.hide();
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
