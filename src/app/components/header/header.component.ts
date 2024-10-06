import { Component, OnInit } from '@angular/core'
import { AsyncPipe, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { Observable, of } from 'rxjs'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgIf, RouterLink, AsyncPipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    protected loggedInUser$: Observable<string | null>

    constructor(private authService: AuthService) {
        this.loggedInUser$ = this.authService.loggedInUser$
    }
}
