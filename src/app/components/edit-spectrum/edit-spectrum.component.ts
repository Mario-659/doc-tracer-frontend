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
    // extract json editor component to separate angular component
    @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent | undefined;
    public editorOptions: JsonEditorOptions

    constructor(
        private notificationService: NotificationService,
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private fb: FormBuilder,
    ) {
        this.editorOptions = new JsonEditorOptions()
        this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
        this.editorOptions.mode = "code"

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

            // TODO probably temporary solution, as it strips timezone value
            const measurementDate = spectrum.measurementDate ? spectrum.measurementDate.slice(0, -4) : ''
            this.spectrumForm.patchValue({
                ...spectrum,
                measurementDate: measurementDate,
                spectrumSamples: JSON.parse(spectrum.spectrumSamples)
            })
        })
    }

    loadDeviceNames(): void {
        this.dataService.getDevices().subscribe(devices => this.devices = devices)
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
            // TODO make device name in database unique and update by it's name
            updateRequest.deviceId = this.devices.find(d => d.name === formValues.deviceName)?.id
        }

        if (formValues.sampleId !== originalSpectrum.sampleId) {
            // TODO maybe better than sampleID???
            updateRequest.sampleId = formValues.sampleId;
        }

        if (formValues.createdBy !== originalSpectrum.createdBy) {
            updateRequest.username = formValues.createdBy;
        }

        if (formValues.measurementDate !== originalSpectrum.measurementDate.split('T')[0]) {
            // TODO .toISOString will always return the same timezone, fix it -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
            updateRequest.measurementDate = new Date(formValues.measurementDate).toISOString();
        }

        // TODO fix comparison below (formValues.spectrumSamples is json object, originalSpectrum.spectrumSamples is string)
        if (formValues.specrumSamples !== originalSpectrum.spectrumSamples) {
            updateRequest.spectrumSample = JSON.stringify(formValues.spectrumSamples);
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

