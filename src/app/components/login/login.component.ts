import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

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

    constructor(private router: Router) {}

    login(): void {
        console.log('trying to log in');
    }
}
