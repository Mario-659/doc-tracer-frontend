import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { NgIf } from '@angular/common'
import { AuthService } from '../../services/auth.service'
import { HttpError } from '../../model/http-error'

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
    errorMessage: string = ''

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    login(): void {
        this.authService.login(this.username, this.password).subscribe({
            next: () => this.router.navigate(['/dashboard']),
            error: (e: HttpError) => this.handleError(e),
        })
    }

    private handleError(error: HttpError) {
        if (error.type === 'Client-side' || !error.status) {
            this.errorMessage = 'Network issue occurred while connecting to server'
        } else if (error.status >= 400 && error.status < 500) {
            this.errorMessage = error.message
        } else {
            this.errorMessage = 'A server-side error occurred'
        }
    }
}
