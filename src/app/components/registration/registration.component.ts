import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgIf } from '@angular/common'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { RegisterPayload } from '../../models/register-payload'
import { NotificationService } from '../../services/notification.service'
import { HttpError } from '../../models/http-error'
import { NotificationType } from '../../models/notification'

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [FormsModule, NgIf],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
    username: string = ''
    password: string = ''
    email: string = ''
    firstName: string = ''
    lastName: string = ''

    constructor(
        private router: Router,
        private authService: AuthService,
        private notificationService: NotificationService
    ) {}

    register() {
        const payload: RegisterPayload = {
            username: this.username,
            password: this.password,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
        }

        this.authService.register(payload).subscribe({
            next: () => {
                this.notificationService.showNotification({ message: 'Registration successful', type: NotificationType.success});
                this.router.navigate(['/login']);
            },
            error: (e: HttpError) => this.handleError(e)
        })
    }

    // TODO remove duplication below (with login component)
    private handleError(error: HttpError) {
        let errorMessage: string;
        if (error.type === 'Client-side' || !error.status) {
            errorMessage = 'Network issue occurred while connecting to server'
        } else if (error.status >= 400 && error.status < 500) {
            errorMessage = error.message
        } else {
            errorMessage = 'A server-side error occurred'
        }

        this.notificationService.showNotification({ message: errorMessage, type: NotificationType.error });
    }
}
