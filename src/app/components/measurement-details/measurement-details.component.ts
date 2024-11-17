import { Component, OnInit } from '@angular/core'
import { filter, Observable, map } from 'rxjs'
import { Measurement } from '../../models/api/measurement'
import { ActivatedRoute } from '@angular/router'
import { DataService } from '../../services/data.service'
import { AsyncPipe, DatePipe, NgIf } from '@angular/common'
import { AgGridAngular } from 'ag-grid-angular'
import { Sample } from '../../models/api/sample'
import { ColDef } from 'ag-grid-community'

@Component({
    selector: 'app-measurement-details',
    standalone: true,
    imports: [
        NgIf,
        AsyncPipe,
        DatePipe,
        AgGridAngular,
    ],
    templateUrl: './measurement-details.component.html',
    styleUrl: './measurement-details.component.scss',
})
export class MeasurementDetailsComponent implements OnInit {
    measurement$: Observable<Measurement | undefined> | undefined
    samples$: Observable<Sample[] | undefined> | undefined

    constructor(private route: ActivatedRoute, private dataService: DataService) {
    }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'))
        this.measurement$ = this.dataService.getMeasurement(id)
        this.samples$ = this.dataService.getSamples().pipe(
            map(samples => samples.filter((sample: any) => sample.measurementId === id)),
        )
    }

    sampleColumnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: 'Name', field: 'name', sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'Type', field: 'type', sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'Created At', field: 'createdAt', sortable: true, filter: 'agDateColumnFilter' },
        { headerName: 'Updated At', field: 'updatedAt', sortable: true, filter: 'agDateColumnFilter' },
    ];
}
