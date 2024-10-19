import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, switchMap } from 'rxjs'
import { DataService } from '../../services/data.service'
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common'
import { Spectrum } from '../../models/spectrum'
import { NotificationService } from '../../services/notification.service'
import { AppNotification, NotificationType } from '../../models/notification'

@Component({
  selector: 'app-spectrum-details',
  standalone: true,
    imports: [
        NgIf,
        AsyncPipe,
        JsonPipe,
        DatePipe,
    ],
  templateUrl: './spectrum-details.component.html',
  styleUrl: './spectrum-details.component.scss'
})
export class SpectrumDetailsComponent implements OnInit {
    spectrumDetails$: Observable<Spectrum | undefined> | undefined;
    protected readonly JSON = JSON

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService,
        private notificationService:  NotificationService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.spectrumDetails$ = this.route.paramMap.pipe(
            switchMap(params => this.dataService.getSpectrum(Number(params.get('id'))))
        )
    }

    downloadSpectrumData(spectrum: Spectrum) {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(spectrum.spectrumSamples));
        const downloadAnchorNode = document.createElement('a');

        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', `spectrum_${spectrum.id}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    editSpectrum(id: number) {
        this.router.navigate([`/spectra/${id}/edit`])

    }

    deleteSpectrum(id: number) {
        console.log('called deleteSpectrum with id ', id)
        this.dataService.deleteSpectrum(id).subscribe({
            next: () => {
                this.notificationService.showNotification(new AppNotification(`Spectrum with id ${id} deleted`, NotificationType.success))
                this.router.navigate(["/spectra"])
            }
        })
    }

}
