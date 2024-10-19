import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { DataService } from '../../services/data.service'
import { NgForOf, NgIf } from '@angular/common'
import { Device } from '../../models/device'
import { SpectrumType } from '../../models/spectrum-type'

@Component({
    selector: 'app-edit-spectrum',
    templateUrl: './edit-spectrum.component.html',
    standalone: true,
    styleUrls: ['./edit-spectrum.component.scss'],
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgForOf,
    ],
})
export class EditSpectrumComponent implements OnInit {
    spectrumForm: FormGroup
    devices: Device[] | undefined
    spectrumTypes: SpectrumType[] | undefined
    spectrumId: number | undefined

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
        // TODO forkjoin these requests
        this.route.paramMap.subscribe(
            params => {
                this.spectrumId = Number(params.get('id'))
                this.loadSpectrumDetails(this.spectrumId)
            },
        )
        this.loadDeviceNames()
        this.loadSpectrumTypes()
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
        this.dataService.getDeviceNames().subscribe(devices => this.devices = devices)
    }


    loadSpectrumTypes(): void {
        this.dataService.getSpectrumTypes().subscribe(spectraTypes => this.spectrumTypes = spectraTypes)
    }

    save(): void {
        if (this.spectrumForm.valid) {
            // this.dataService.updateSpectrum(this.spectrumId, this.spectrumForm.value).subscribe(() => {
            //     // Navigate back to the details page or show a success message
            //     this.router.navigate(['/spectrum', this.spectrumId]);
            // });
        }
    }

    goSpectrumDetails() {
        this.router.navigate([`/spectra/${this.spectrumId}`])
    }
}

