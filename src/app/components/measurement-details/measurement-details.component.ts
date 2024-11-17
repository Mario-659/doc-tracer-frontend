import { Component, OnInit } from '@angular/core'
import { filter, Observable, map } from 'rxjs'
import { Measurement } from '../../models/api/measurement'
import { ActivatedRoute, Route, Router } from '@angular/router'
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

    constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {
    }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'))
        this.measurement$ = this.dataService.getMeasurement(id)
        this.samples$ = this.dataService.getSamplesByMeasurementId(id)
    }

    expandedSections = {
        properties: true,
        conditions: true,
        samples: true
    };

    sampleColumnDefs: ColDef[] = [
        {
            headerName: 'ID',
            field: 'id',
            sortable: true,
            filter: 'agNumberColumnFilter',
            flex: 1,
            onCellClicked: (params) => this.goToSampleDetails(params.value),
            cellClass: ['link-primary'],
        },
        {
            headerName: 'Name',
            field: 'name',
            sortable: true,
            filter: 'agTextColumnFilter',
            flex: 2,
        },
        {
            headerName: 'Type',
            field: 'type',
            sortable: true,
            filter: 'agTextColumnFilter',
            flex: 1,
        },
        {
            headerName: 'Created At',
            field: 'createdAt',
            sortable: true,
            filter: 'agDateColumnFilter',
            flex: 1,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString();
            },
        },
        {
            headerName: 'Updated At',
            field: 'updatedAt',
            sortable: true,
            filter: 'agDateColumnFilter',
            flex: 1,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString();
            },
        },
    ];


    toggleSection(section: keyof typeof this.expandedSections): void {
        this.expandedSections[section] = !this.expandedSections[section];
    }

    private goToSampleDetails(id: number) {
       this.router.navigate(['/samples', id])
    }
}
