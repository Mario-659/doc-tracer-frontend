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
    imports: [
        ReactiveFormsModule,
        NgForOf,
    ],
  templateUrl: './edit-measurement.component.html',
  styleUrl: './edit-measurement.component.scss'
})
export class EditMeasurementComponent implements OnInit {
    measurementForm: FormGroup;
    devices: Device[] = [];
    coveredMaterials: CoveredMaterial[] = [];
    coveringMaterials: CoveringMaterial[] = [];
    conditions: MeasurementCondition[] = [];
    measurementId: number = -1;
    originalMeasurement: any;

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router,
        private notificationService: NotificationService
    ) {
        this.measurementForm = this.fb.group({
            coveringMaterialId: [''],
            coveredMaterialId: [''],
            deviceId: [''],
            conditions: this.fb.group({
                description: [''],
                lightSource: [''],
                exposure: [''],
                gain: [''],
                brightness: [''],
            }),
            comments: [''],
            measurementDate: [''],
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.measurementId = Number(params.get('id'));
            this.loadMeasurementDetails(this.measurementId);
        });

        this.loadDevices();
        this.loadCoveredMaterials();
        this.loadCoveringMaterials();
    }

    loadMeasurementDetails(id: number): void {
        this.dataService.getMeasurement(id).subscribe((measurement) => {
            this.originalMeasurement = measurement;

            this.measurementForm.patchValue({
                coveringMaterial: measurement.coveringMaterial ?? '',
                coveredMaterial: measurement.coveredMaterial ?? '',
                conditions: {
                    description: measurement.conditions.description ?? '',
                    lightSource: measurement.conditions.lightSource ?? '',
                    exposure: measurement.conditions.exposure ?? '',
                    gain: measurement.conditions.gain ?? '',
                    brightness: measurement.conditions.brightness ?? ''
                },
                comments: measurement.comments,
                measurementDate: measurement.measurementDate.slice(0, -1)
            });
        });
    }

    loadDevices(): void {
        this.dataService.getDevices().subscribe((devices) => {
            this.devices = devices;
        });
    }

    loadCoveredMaterials(): void {
        this.dataService.getCoveredMaterials().subscribe((materials) => {
            this.coveredMaterials = materials
        });
    }

    loadCoveringMaterials(): void {
        this.dataService.getCoveringMaterials().subscribe((materials) => {
            this.coveringMaterials = materials
        });
    }

    save(): void {
        if (!this.measurementForm.valid) return;

        const formValues = this.measurementForm.value;

        const updateRequest = {
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
            measurementDate: formValues.measurementDate,
        };

        this.dataService.updateMeasurement(this.measurementId, updateRequest).subscribe(() => {
            this.notificationService.showNotification(
                new AppNotification(`Measurement with id ${this.measurementId} has been updated`, NotificationType.success)
            );
            this.goMeasurementDetails();
        });
    }

    getChangedFields(formValues: any, originalMeasurement: any): any {
        const updateRequest: any = {};

        if (formValues.coveringMaterial !== originalMeasurement.coveringMaterial) {
            updateRequest.coveringMaterial = formValues.coveringMaterial;
        }

        if (formValues.coveredMaterial !== originalMeasurement.coveredMaterial) {
            updateRequest.coveredMaterial = formValues.coveredMaterial;
        }

        if (formValues.userId !== originalMeasurement.userId) {
            updateRequest.userId = formValues.userId;
        }

        if (formValues.deviceId !== originalMeasurement.deviceId) {
            updateRequest.deviceId = formValues.deviceId;
        }

        if (formValues.conditionsId !== originalMeasurement.conditions?.id) {
            updateRequest.conditionsId = formValues.conditionsId;
        }

        if (formValues.comments !== originalMeasurement.comments) {
            updateRequest.comments = formValues.comments;
        }

        if (formValues.measurementDate !== originalMeasurement.measurementDate.split('T')[0]) {
            updateRequest.measurementDate = new Date(formValues.measurementDate).toISOString();
        }

        return updateRequest;
    }

    goMeasurementDetails(): void {
        this.router.navigate([`/measurements/${this.measurementId}`]);
    }

    cancel(): void {
        this.router.navigate(['/measurements']);
    }
}

