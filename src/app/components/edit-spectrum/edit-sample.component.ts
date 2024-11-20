import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { DataService } from '../../services/data.service'
import { DatePipe, NgForOf, NgIf } from '@angular/common'
import { NotificationService } from '../../services/notification.service'
import { AppNotification, NotificationType } from '../../models/notification'
import { JsonEditorComponent, JsonEditorOptions, NgJsonEditorModule } from 'ang-jsoneditor'
import { SampleUpdateRequest } from '../../models/api/sample-update-request'
import { Measurement } from '../../models/api/measurement'
import { forkJoin, sample } from 'rxjs'

@Component({
    selector: 'app-edit-sample',
    templateUrl: './edit-sample.component.html',
    standalone: true,
    styleUrls: ['./edit-sample.component.scss'],
    imports: [ReactiveFormsModule, NgIf, NgForOf, NgJsonEditorModule, DatePipe],
})
export class EditSampleComponent implements OnInit {
    sampleForm: FormGroup;
    spectrumTypes = ['REFLECTANCE', 'ABSORPTION', 'FLUORESCENCE', 'TRANSMITTANCE'];
    measurements: Measurement[] = [];
    originalSample: any;

    @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent | undefined;
    public editorOptions: JsonEditorOptions;

    constructor(
        private notificationService: NotificationService,
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private fb: FormBuilder
    ) {
        this.editorOptions = new JsonEditorOptions();
        this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
        this.editorOptions.mode = 'code';

        this.sampleForm = this.fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
            measurementId: ['', Validators.required],
            spectralData: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.loadMeasurements();
        this.route.paramMap.subscribe((params) => {
            const id = Number(params.get('id'));
            this.loadSampleDetails(id);
        });
    }

    loadSampleDetails(id: number): void {
        this.dataService.getSample(id).subscribe((sample) => {
            this.originalSample = sample;
            this.sampleForm.patchValue({
                ...sample,
                spectralData: JSON.parse(sample.spectralData),
            });
        });
    }

    loadMeasurements(): void {
        this.dataService.getMeasurements().subscribe((measurements) => {
            this.measurements = measurements;
        });
    }

    save(): void {
        if (!this.sampleForm.valid) return;

        const formValues = this.sampleForm.value;

        const updateRequest: SampleUpdateRequest = this.getChangedFields(formValues, this.originalSample);

        if (Object.keys(updateRequest).length === 0) {
            this.notificationService.showNotification(new AppNotification(`No changes detected`, NotificationType.info));
            return;
        }

        this.dataService.updateSample(this.originalSample.id, updateRequest).subscribe(() => {
            this.notificationService.showNotification(
                new AppNotification(`Sample with id ${this.originalSample.id} has been updated`, NotificationType.success)
            );
            this.goSampleDetails();
        });
    }

    getChangedFields(formValues: any, originalSample: any): SampleUpdateRequest {
        const updateRequest: SampleUpdateRequest = {};

        if (formValues.name !== originalSample.name) {
            updateRequest.name = formValues.name;
        }

        if (formValues.type !== originalSample.type) {
            updateRequest.type = formValues.type;
        }

        if (formValues.measurementId !== originalSample.measurementId) {
            updateRequest.measurementId = formValues.measurementId;
        }

        if (JSON.stringify(formValues.spectralData) !== originalSample.spectralData) {
            updateRequest.spectralData = formValues.spectralData;
        }

        return updateRequest;
    }

    goSampleDetails(): void {
        this.router.navigate([`/samples/${this.originalSample.id}`]);
    }

}
