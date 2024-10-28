import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgIf } from '@angular/common'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { NotificationService } from '../../services/notification.service'
import { AppNotification, NotificationType } from '../../models/notification'

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, RouterLink],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
    registrationFormGroup: any

    constructor(
        private router: Router,
        private authService: AuthService,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.registrationFormGroup = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.min(5), Validators.max(15)]),
            password: new FormControl('', [Validators.required, Validators.min(8), Validators.max(15)]),
            email: new FormControl('', [Validators.email, Validators.required, Validators.min(3)]),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
        })
    }

    register() {
        this.authService.register(this.registrationFormGroup.value).subscribe({
            next: () => {
                this.notificationService.showNotification(
                    new AppNotification('Registration successful', NotificationType.success)
                )
                this.router.navigate(['/login'])
            },
        })
    }
}
