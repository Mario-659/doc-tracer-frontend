import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { JsonEditorComponent, JsonEditorOptions, NgJsonEditorModule } from 'ang-jsoneditor'
import { DataService } from '../../services/data.service'
import { NotificationService } from '../../services/notification.service'
import { ActivatedRoute, Router } from '@angular/router'
import { AppNotification, NotificationType } from '../../models/notification'
import { NgForOf, NgIf } from '@angular/common'
import { Measurement } from '../../models/api/measurement'

@Component({
    selector: 'app-create-sample',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgJsonEditorModule,
        NgForOf,
    ],
    templateUrl: './create-sample.component.html',
    styleUrl: './create-sample.component.scss',
})
export class CreateSampleComponent implements OnInit {
    sampleForm: FormGroup
    spectrumTypes = ['REFLECTANCE', 'ABSORPTION', 'FLUORESCENCE', 'TRANSMITTANCE']
    measurements: Measurement[] = []
    @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent | undefined
    public editorOptions: JsonEditorOptions

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private notificationService: NotificationService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.editorOptions = new JsonEditorOptions()
        this.editorOptions.modes = ['code', 'text', 'tree', 'view']
        this.editorOptions.mode = 'code'

        this.sampleForm = this.fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
            measurementId: ['', Validators.required],
            spectralData: ['', Validators.required],
        })
    }

    ngOnInit(): void {
        this.loadMeasurements()
    }

    loadMeasurements(): void {
        this.dataService.getMeasurements().subscribe((measurements) => {
            this.measurements = measurements
        })
    }

    save(): void {
        if (!this.sampleForm.valid) {
            this.notificationService.showNotification(
                new AppNotification('Please fill in all required fields', NotificationType.warning),
            )
            return
        }

        const formValues = this.sampleForm.value

        this.dataService.createSample(formValues).subscribe(
            () => {
                this.notificationService.showNotification(
                    new AppNotification(`Sample has been created`, NotificationType.success),
                )
                this.goToSamples()
            },
        )
    }

    goToSamples(): void {
        this.router.navigate(['/samples'])
    }
}

