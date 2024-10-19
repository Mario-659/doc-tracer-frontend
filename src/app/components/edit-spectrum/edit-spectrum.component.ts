import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { DataService } from '../../services/data.service'
import { tap } from 'rxjs/operators'
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
    spectrumForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private fb: FormBuilder
    ) {
        this.spectrumForm = this.fb.group({
            spectrumTypeName: ['', Validators.required],
            deviceName: ['', Validators.required],
            sampleId: ['', Validators.required],
            createdBy: ['', Validators.required],
            measurementDate: ['', Validators.required],
            createdAt: ['', Validators.required],
            updatedAt: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.pipe(
            tap(params => this.loadSpectrumDetails(Number(params.get('id'))))
        )
    }

    loadSpectrumDetails(id: number): void {
        this.dataService.getSpectrum(id).subscribe(spectrum => {
            this.spectrumForm.patchValue(spectrum);
        });
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

