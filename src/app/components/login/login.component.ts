import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private router: Router, private authService: AuthService) {}

    login(): void {
        this.authService.login(this.username, this.password).subscribe({
            next: () => {
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                this.errorMessage = error;
            }
        });
    }
}
