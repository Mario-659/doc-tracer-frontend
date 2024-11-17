import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { AppGridComponent } from '../app-grid/app-grid.component'
import { Observable } from 'rxjs'
import { Measurement } from '../../models/api/measurement'
import { DataService } from '../../services/data.service'
import { ColDef } from 'ag-grid-community'

@Component({
    selector: 'app-measurements',
    standalone: true,
    imports: [CommonModule, RouterModule, AppGridComponent],
    templateUrl: './measurements.component.html',
    styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
    measurements$: Observable<Measurement[]> | undefined;

    constructor(private dataService: DataService, private router: Router) {}

    ngOnInit(): void {
        this.measurements$ = this.dataService.getMeasurements();
    }

    goToDetails(id: number): void {
        this.router.navigate([`/measurements/${id}`]);
    }

    colDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', filter: 'agNumberColumnFilter' },
        { headerName: 'Covering Material', field: 'coveringMaterial', filter: 'agTextColumnFilter' },
        { headerName: 'Covered Material', field: 'coveredMaterial', filter: 'agTextColumnFilter' },
        { headerName: 'User', field: 'user', filter: 'agTextColumnFilter' },
        { headerName: 'Device', field: 'device', filter: 'agTextColumnFilter' },
        { headerName: 'Measurement Date', field: 'measurementDate', filter: 'agDateColumnFilter' },
        { headerName: 'Created At', field: 'createdAt', filter: 'agDateColumnFilter' },
        { headerName: 'Updated At', field: 'updatedAt', filter: 'agDateColumnFilter' },
    ];
}
