import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgIf } from '@angular/common'
import { AuthService } from '../../services/auth.service'
import { NotificationService } from '../../services/notification.service'
import { NotificationType } from '../../models/notification'

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    loginFormGroup: any;

    constructor(
        private router: Router,
        private authService: AuthService,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.loginFormGroup = new FormGroup({
            username: new FormControl<string>('', [Validators.required]),
            password: new FormControl<string>('', [Validators.required])
        })
    }

    login(): void {
        this.authService.login(this.loginFormGroup.value).subscribe({
            next: () => {
                this.notificationService.showNotification({ message: 'Login successful', type: NotificationType.success });
                this.router.navigate(['/dashboard'])
            }
        })
    }
}
