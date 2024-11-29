import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Device } from '../../models/api/device'
import { MeasurementCondition } from '../../models/api/measurement-condition'
import { DataService } from '../../services/data.service'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationService } from '../../services/notification.service'
import { AppNotification, NotificationType } from '../../models/notification'
import { NgForOf } from '@angular/common'
import { CoveredMaterial } from '../../models/api/covered-materials'
import { CoveringMaterial } from '../../models/api/covering-material'

@Component({
    selector: 'app-edit-measurement',
    standalone: true,
    imports: [ReactiveFormsModule, NgForOf],
    templateUrl: './edit-measurement.component.html',
    styleUrl: './edit-measurement.component.scss',
})
export class EditMeasurementComponent implements OnInit {
    measurementForm: FormGroup
    devices: Device[] = []
    coveredMaterials: CoveredMaterial[] = []
    coveringMaterials: CoveringMaterial[] = []
    conditions: MeasurementCondition[] = []
    measurementId: number = -1
    originalMeasurement: any

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router,
        private notificationService: NotificationService
    ) {
        this.measurementForm = this.fb.group({
            coveringMaterialId: ['', Validators.required],
            coveredMaterialId: ['', Validators.required],
            deviceId: ['', Validators.required],
            conditions: this.fb.group({
                description: ['', [Validators.required, Validators.maxLength(255)]],
                lightSource: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
                exposure: ['', [Validators.min(0), Validators.max(100)]],
                gain: ['', [Validators.min(0), Validators.max(100)]],
                brightness: ['', [Validators.min(0), Validators.max(100)]],
            }),
            comments: ['', Validators.maxLength(500)],
            measurementDate: ['', Validators.required],
        })
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.measurementId = Number(params.get('id'))
            this.loadMeasurementDetails(this.measurementId)
        })

        this.loadDevices()
        this.loadCoveredMaterials()
        this.loadCoveringMaterials()
    }

    loadMeasurementDetails(id: number): void {
        this.dataService.getMeasurement(id).subscribe((measurement) => {
            this.originalMeasurement = measurement

            this.measurementForm.patchValue({
                coveringMaterial: measurement.coveringMaterial ?? '',
                coveredMaterial: measurement.coveredMaterial ?? '',
                conditions: {
                    description: measurement.conditions.description ?? '',
                    lightSource: measurement.conditions.lightSource ?? '',
                    exposure: measurement.conditions.exposure ?? '',
                    gain: measurement.conditions.gain ?? '',
                    brightness: measurement.conditions.brightness ?? '',
                },
                comments: measurement.comments,
                measurementDate: measurement.measurementDate.slice(0, -1),
            })
        })
    }

    loadDevices(): void {
        this.dataService.getDevices().subscribe((devices) => {
            this.devices = devices
        })
    }

    loadCoveredMaterials(): void {
        this.dataService.getCoveredMaterials().subscribe((materials) => {
            this.coveredMaterials = materials
        })
    }

    loadCoveringMaterials(): void {
        this.dataService.getCoveringMaterials().subscribe((materials) => {
            this.coveringMaterials = materials
        })
    }

    save(): void {
        if (!this.measurementForm.valid) return

        const updateRequest = this.prepareUpdateRequest(this.measurementForm.value)

        this.dataService.updateMeasurement(this.measurementId, updateRequest).subscribe(() => {
            this.notificationService.showNotification(
                new AppNotification(
                    `Measurement with id ${this.measurementId} has been updated`,
                    NotificationType.success
                )
            )
            this.goMeasurementDetails()
        })
    }

    prepareUpdateRequest(formValues: any): any {
        return {
            coveringMaterialId: formValues.coveringMaterialId,
            coveredMaterialId: formValues.coveredMaterialId,
            conditions: {
                description: formValues.conditions.description,
                lightSource: formValues.conditions.lightSource,
                exposure: formValues.conditions.exposure,
                gain: formValues.conditions.gain,
                brightness: formValues.conditions.brightness,
            },
            comments: formValues.comments,
            measurementDate: new Date(formValues.measurementDate).toISOString(),
        }
    }

    goMeasurementDetails(): void {
        this.router.navigate([`/measurements/${this.measurementId}`])
    }

    cancel(): void {
        this.router.navigate(['/measurements'])
    }
}
