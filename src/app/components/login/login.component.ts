import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { NgIf } from '@angular/common'
import { AuthService } from '../../services/auth.service'
import { HttpError } from '../../models/http-error'
import { NotificationService } from '../../services/notification.service'
import { NotificationType } from '../../models/notification'

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, NgIf],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    username: string = ''
    password: string = ''

    constructor(
        private router: Router,
        private authService: AuthService,
        private notificationService: NotificationService
    ) {}

    login(): void {
        this.authService.login({ username: this.username, password: this.password }).subscribe({
            next: () => {
                this.notificationService.showNotification({ message: 'Login successful', type: NotificationType.success });
                this.router.navigate(['/dashboard'])
            },
            error: (e: HttpError) => this.handleError(e),
        })
    }

    private handleError(error: HttpError) {
        let errorMessage: string;
        if (error.type === 'Client-side' || !error.status) {
            errorMessage = 'Network issue occurred while connecting to server'
        } else if (error.status >= 400 && error.status < 500) {
            errorMessage = error.message
        } else {
            errorMessage = 'A server-side error occurred'
        }

        this.notificationService.showNotification({ message: errorMessage, type: NotificationType.warning });
    }
}
