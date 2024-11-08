import { Component } from '@angular/core'
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FooterComponent } from './components/footer/footer.component'
import { NotificationComponent } from './components/notification/notification.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        FooterComponent,
        NotificationComponent,
        SidebarComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'doc-tracer-frontend'
    authenticationPage = true

    constructor(protected router: Router) {
        this.router.events.subscribe(() => {
            this.authenticationPage = this.router.url === '/login' || this.router.url === '/register'
        })
    }
}
