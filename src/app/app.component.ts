import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FooterComponent } from './components/footer/footer.component'
import { NotificationComponent } from "./components/notification/notification.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FooterComponent, NotificationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'doc-tracer-frontend'
}
