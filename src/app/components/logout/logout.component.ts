import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../../services/notification.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { NotificationType } from '../../models/notification'

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {

    constructor(
        private notificationService: NotificationService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.authService.logout()
        this.notificationService.showNotification({message: "Logged out successfully", type: NotificationType.info})
        this.router.navigate(['/login'])
    }
}
