import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Device } from '../../models/api/device'
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router'
import { NotificationService } from '../../services/notification.service'
import { AppNotification, NotificationType } from '../../models/notification'
import { NgForOf } from '@angular/common'
import { CoveredMaterial } from '../../models/api/covered-materials'
import { CoveringMaterial } from '../../models/api/covering-material'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-new-measurement',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgForOf,
    ],
    templateUrl: './new-measurement.component.html',
    styleUrl: './new-measurement.component.scss'
})
export class NewMeasurementComponent implements OnInit {
    measurementForm: FormGroup;
    devices: Device[] = [];
    coveredMaterials: CoveredMaterial[] = [];
    coveringMaterials: CoveringMaterial[] = [];
    measurementId: number = -1;

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private router: Router,
        private notificationService: NotificationService,
        private authService: AuthService
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
        });
    }

    ngOnInit(): void {
        this.loadDevices();
        this.loadCoveredMaterials();
        this.loadCoveringMaterials();
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

        const createRequest = this.prepareUpdateRequest(this.measurementForm.value);
        console.log(createRequest)

        this.dataService.createMeasurement(createRequest).subscribe((res) => {
            this.notificationService.showNotification(
                new AppNotification(`Measurement with id ${res.id} has been created`, NotificationType.success)
            );
            this.goMeasurementDetails(res.id);
        });
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
            deviceId: formValues.deviceId,
            comments: formValues.comments,
            measurementDate: new Date(formValues.measurementDate).toISOString(),
            username: this.authService.loggedInUser$.value?.username
        };
    }

    goMeasurementDetails(measurementId: number): void {
        this.router.navigate([`/measurements/${measurementId}`]);
    }

    cancel(): void {
        this.router.navigate(['/measurements']);
    }
}

