import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-registration',
  standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
    username: string = '';
    password: string = '';
    email: string = '';
    firstName: string = '';
    lastName: string = '';
    errorMessage: string = '';

    constructor(private router: Router, private authService: AuthService) {}

    register() {
        this.authService.register(this.username, this.password, this.email, this.firstName, this.lastName).subscribe({
            next: () => {
                // TODO handle success (show banner that registration was successful)
                // this.router.navigate(['/login']);
            },
            error: (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse)
                console.log(errorResponse.error)
                console.log(errorResponse.error.message)

                this.errorMessage = errorResponse.error.message;
            }
        });
    }
}
