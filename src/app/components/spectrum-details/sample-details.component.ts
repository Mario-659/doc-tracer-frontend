import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, switchMap } from 'rxjs'
import { DataService } from '../../services/data.service'
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common'
import { NotificationService } from '../../services/notification.service'
import { AppNotification, NotificationType } from '../../models/notification'
import { Sample } from '../../models/api/sample'

@Component({
    selector: 'app-sample-details',
    standalone: true,
    imports: [NgIf, AsyncPipe, JsonPipe, DatePipe],
    templateUrl: './sample-details.component.html',
    styleUrl: './sample-details.component.scss',
})
export class SampleDetailsComponent implements OnInit {
    sample$: Observable<Sample | undefined> | undefined
    protected readonly JSON = JSON

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService,
        private notificationService: NotificationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.sample$ = this.route.paramMap.pipe(
            switchMap((params) => this.dataService.getSample(Number(params.get('id'))))
        )
    }

    downloadSampleData(sample: Sample): void {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(sample.spectralData);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', `sample_${sample.id}_spectral_data.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }


    editSample(id: number): void {
        this.router.navigate([`/samples/${id}/edit`]);
    }


    deleteSample(id: number): void {
        this.dataService.deleteSample(id).subscribe({
            next: () => {
                this.notificationService.showNotification(
                    new AppNotification(`Sample with ID ${id} deleted successfully`, NotificationType.success)
                );
                this.router.navigate(['/samples']);
            },
        });
    }
}
