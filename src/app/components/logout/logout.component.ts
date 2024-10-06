import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../../services/notification.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { AppNotification, NotificationType } from '../../models/notification'

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.scss',
})
export class LogoutComponent implements OnInit {
    constructor(
        private notificationService: NotificationService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.authService.logout()
        this.notificationService.showNotification(new AppNotification('Logged out successfully', NotificationType.info))
        this.router.navigate(['/login'])
    }
}
