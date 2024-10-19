import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { DataService } from '../../services/data.service'
import { switchMap, tap } from 'rxjs/operators'
import { NgIf } from '@angular/common'

@Component({
    selector: 'app-edit-spectrum',
    templateUrl: './edit-spectrum.component.html',
    standalone: true,
    styleUrls: ['./edit-spectrum.component.scss'],
    imports: [
        ReactiveFormsModule,
        NgIf,
    ],
})
export class EditSpectrumComponent implements OnInit {
    spectrumForm: FormGroup
    deviceNames: string[] | undefined

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private fb: FormBuilder,
    ) {
        this.spectrumForm = this.fb.group({
            spectrumTypeName: ['', Validators.required],
            deviceName: ['', Validators.required],
            sampleId: ['', Validators.required],
            createdBy: ['', Validators.required],
            measurementDate: ['', Validators.required],
            createdAt: ['', Validators.required],
            updatedAt: ['', Validators.required],
        })
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            params => this.loadSpectrumDetails(Number(params.get('id'))),
        )
        this.loadDeviceNames()
    }

    loadSpectrumDetails(id: number): void {
        this.dataService.getSpectrum(id).subscribe(spectrum => {
            const measurementDate = spectrum.measurementDate ? spectrum.measurementDate.split('T')[0] : '';

            this.spectrumForm.patchValue({
                ...spectrum,
                measurementDate: measurementDate
            })
        })
    }

    loadDeviceNames(): void {
        this.dataService.getDeviceNames().pipe(tap(devices => this.deviceNames = devices.map(d => d.name)))
    }

    save(): void {
        if (this.spectrumForm.valid) {
            // this.dataService.updateSpectrum(this.spectrumId, this.spectrumForm.value).subscribe(() => {
            //     // Navigate back to the details page or show a success message
            //     this.router.navigate(['/spectrum', this.spectrumId]);
            // });
        }
    }
}

