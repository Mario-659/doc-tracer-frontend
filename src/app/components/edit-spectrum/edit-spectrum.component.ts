import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { DataService } from '../../services/data.service'
import { NgForOf, NgIf } from '@angular/common'
import { Device } from '../../models/device'
import { SpectrumType } from '../../models/spectrum-type'
import { SpectrumUpdateRequest } from '../../models/spectrum-update-request'
import { NotificationService } from '../../services/notification.service'
import { AppNotification, NotificationType } from '../../models/notification'
import { JsonEditorComponent, JsonEditorOptions, NgJsonEditorModule } from 'ang-jsoneditor'

@Component({
    selector: 'app-edit-spectrum',
    templateUrl: './edit-spectrum.component.html',
    standalone: true,
    styleUrls: ['./edit-spectrum.component.scss'],
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgForOf,
        NgJsonEditorModule
    ],
})
export class EditSpectrumComponent implements OnInit {
    spectrumForm: FormGroup
    devices: Device[] = []
    spectrumTypes: SpectrumType[] | undefined
    spectrumId: number = -1
    originalSpectrum: any
    @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent | undefined;
    public editorOptions: JsonEditorOptions
    public data: any

    constructor(
        private notificationService: NotificationService,
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private fb: FormBuilder,
    ) {
        this.editorOptions = new JsonEditorOptions()
        this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
        this.data = {"products":[{"name":"car","product":[{"name":"honda","model":[{"id":"civic","name":"civic"},{"id":"accord","name":"accord"},{"id":"crv","name":"crv"},{"id":"pilot","name":"pilot"},{"id":"odyssey","name":"odyssey"}]}]}]}

        this.spectrumForm = this.fb.group({
            spectrumTypeName: ['', Validators.required],
            deviceName: ['', Validators.required],
            sampleId: ['', Validators.required],
            createdBy: ['', Validators.required],
            measurementDate: ['', Validators.required],
            spectrumSamples: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        // TODO forkjoin these requests
        // TODO add spectrum json edit
        this.route.paramMap.subscribe(params => {
            this.spectrumId = Number(params.get('id'));
            this.loadSpectrumDetails(this.spectrumId);
        });
        this.loadDeviceNames();
        this.loadSpectrumTypes();
    }

    loadSpectrumDetails(id: number): void {
        this.dataService.getSpectrum(id).subscribe(spectrum => {
            this.originalSpectrum = spectrum

            const measurementDate = spectrum.measurementDate ? spectrum.measurementDate.split('T')[0] : ''
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
        this.dataService.getSpectrumTypes().subscribe(spectraTypes => this.spectrumTypes = spectraTypes);
    }

    save(): void {
        if (!this.spectrumForm.valid) return;

        const formValues = this.spectrumForm.value;

        const updateRequest: SpectrumUpdateRequest = this.getChangedFields(formValues, this.originalSpectrum);

        if (Object.keys(updateRequest).length === 0) {
            this.notificationService.showNotification(new AppNotification(`No changes detected`, NotificationType.info));
            return;
        }

        this.dataService.updateSpectrum(this.spectrumId, updateRequest).subscribe(() => {
            this.notificationService.showNotification(new AppNotification(`Spectrum with id ${this.spectrumId} has been updated`, NotificationType.success));
            this.goSpectrumDetails()
        });
    }

    getChangedFields(formValues: any, originalSpectrum: any): SpectrumUpdateRequest {
        const updateRequest: SpectrumUpdateRequest = {};

        if (formValues.spectrumTypeName !== originalSpectrum.spectrumTypeName) {
            updateRequest.spectrumType = formValues.spectrumTypeName;
        }

        if (formValues.deviceName !== originalSpectrum.deviceName) {
            updateRequest.deviceId = this.devices.find(d => d.name === formValues.deviceName)?.id
        }

        if (formValues.sampleId !== originalSpectrum.sampleId) {
            updateRequest.sampleId = formValues.sampleId;
        }

        if (formValues.createdBy !== originalSpectrum.createdBy) {
            updateRequest.username = formValues.createdBy;
        }

        if (formValues.measurementDate !== originalSpectrum.measurementDate.split('T')[0]) {
            updateRequest.measurementDate = new Date(formValues.measurementDate).toISOString();
        }

        return updateRequest;
    }

    goSpectrumDetails() {
        this.router.navigate([`/spectra/${this.spectrumId}`]);
    }

    getData($event: any) {
        // this.EditedData = JSON.stringify(d, null, 2);
    }
}
