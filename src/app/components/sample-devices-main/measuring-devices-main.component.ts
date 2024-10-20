import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { DataService } from '../../services/data.service'
import { Observable } from 'rxjs'
import { Device } from '../../models/device'
import { ColDef } from 'ag-grid-community'
import { AsyncPipe, NgIf } from '@angular/common'
import { AgGridAngular } from 'ag-grid-angular'

@Component({
    selector: 'app-measuring-devices-main',
    standalone: true,
    imports: [
        AsyncPipe,
        AgGridAngular,
        NgIf,
    ],
    templateUrl: './measuring-devices-main.component.html',
    styleUrl: 'measuring-devices-main.component.scss',
})
export class MeasuringDevicesMainComponent implements OnInit {
    $devices: Observable<Device[]> | undefined

    constructor(
        private router: Router,
        private dataService: DataService
    ) {}

    ngOnInit() {
        this.$devices = this.dataService.getDevices()
    }

    colDefs: ColDef[] = [
        {
            headerName: "Id",
            field: "id",
            filter: "agNumberColumnFilter",
            // onCellClicked: (event) => this.goDeviceDetails(event.data.id),
            // cellClass: ['link-primary']
        },
        {
            headerName: "Name",
            field: "name",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Description",
            field: "description",
            filter: "agTextColumnFilter"
        },
        {
            headerName: "Manufacturer",
            field: "manufacturer",
            filter: "agTextColumnFilter"
        },
        {
            headerName: "Created At",
            field: "createdAt",
            filter: "agDateColumnFilter",
            valueFormatter: this.formatDate
        },
        {
            headerName: "Updated At",
            field: "updatedAt",
            filter: "agDateColumnFilter",
            valueFormatter: this.formatDate
        },
        {
            headerName: "Created At",
            field: "createdAt",
            filter: "agDateColumnFilter",
            valueFormatter: this.formatDate
        }
    ];

    // goDeviceDetails(id: number) {
    //     this.router.navigate(["/devices", id])
    // }

    formatDate(params: any): string {
        const date = new Date(params.value);
        return date.toLocaleString();
    }
}
