import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { JsonEditorComponent, JsonEditorOptions, NgJsonEditorModule } from 'ang-jsoneditor'
import { DataService } from '../../services/data.service'
import { NotificationService } from '../../services/notification.service'
import { ActivatedRoute, Router } from '@angular/router'
import { AppNotification, NotificationType } from '../../models/notification'
import { DatePipe, NgForOf, NgIf } from '@angular/common'
import { Measurement } from '../../models/api/measurement'
import * as Papa from 'papaparse'

@Component({
    selector: 'app-create-sample',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, NgJsonEditorModule, NgForOf, DatePipe],
    templateUrl: './create-sample.component.html',
    styleUrl: './create-sample.component.scss',
})
export class CreateSampleComponent implements OnInit {
    sampleForm: FormGroup
    spectrumTypes = ['REFLECTANCE', 'ABSORPTION', 'FLUORESCENCE', 'TRANSMITTANCE']
    measurements: Measurement[] = []
    @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent | undefined
    @ViewChild('csvUpload', { static: false }) csvUpload!: ElementRef<HTMLInputElement>
    public editorOptions: JsonEditorOptions

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private notificationService: NotificationService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.editorOptions = new JsonEditorOptions()
        this.editorOptions.modes = ['code', 'text', 'tree', 'view']
        this.editorOptions.mode = 'code'

        const jsonEditorInitValue = [
            {
                wavelength: 400,
                intensity: 24.3,
            },
            {
                'more-data-points': NaN,
            },
        ]

        this.sampleForm = this.fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
            measurementId: ['', Validators.required],
            spectralData: [jsonEditorInitValue],
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
                new AppNotification('Please fill in all required fields', NotificationType.warning)
            )
            return
        }

        const formValues = this.sampleForm.value

        const parsedJson = formValues.spectralData
        if (!this.validateSpectralData(parsedJson)) {
            return
        }

        this.dataService.createSample(formValues).subscribe(() => {
            this.notificationService.showNotification(
                new AppNotification(`Sample has been created`, NotificationType.success)
            )
            this.goToSamples()
        })
    }

    goToSamples(): void {
        this.router.navigate(['/samples'])
    }

    validateSpectralData(data: any): boolean {
        if (!Array.isArray(data)) {
            this.notificationService.showNotification(
                new AppNotification(`Spectral data is not an array`, NotificationType.error)
            )
            return false
        }

        if (data.length === 0) {
            this.notificationService.showNotification(
                new AppNotification(`Spectral data array cannot be empty`, NotificationType.error)
            )
            return false
        }

        if (data.length === 1) {
            this.notificationService.showNotification(
                new AppNotification(`Spectral data array must have size greater than 1`, NotificationType.error)
            )
            return false
        }

        return true
    }

    onCsvUpload(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (!file) {
            return
        }

        const reader = new FileReader()
        reader.onload = (e: any) => {
            const csvData = e.target.result
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                transform(value: string, field: string | number): any {
                    if (field === 'wavelenght') {
                        return parseInt(value)
                    } else {
                        return parseFloat(value)
                    }
                },
                transformHeader(header: string, index: number): string {
                    return header.toLowerCase()
                },
                complete: (result: any) => {
                    const data = result.data as { wavelength: number; intensity: number }[]
                    this.sampleForm.patchValue({ spectralData: data })
                    this.notificationService.showNotification(
                        new AppNotification('CSV file imported successfully!', NotificationType.success)
                    )
                },
                error: () => {
                    this.notificationService.showNotification(
                        new AppNotification('Error parsing CSV file.', NotificationType.error)
                    )
                },
            })
        }

        reader.readAsText(file)
    }

    triggerCsvUpload(): void {
        this.csvUpload.nativeElement.click()
    }
}
