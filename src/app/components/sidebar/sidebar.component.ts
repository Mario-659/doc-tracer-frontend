import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'
import { AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common'
import { AuthService } from '../../services/auth.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-sidebar',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        NgClass,
        NgForOf,
        NgIf,
        NgOptimizedImage,
        AsyncPipe,
    ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    isSidebarExpanded = false;
    protected loggedInUser$: Observable<string | null>
    navItems = [
        { label: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
        { label: 'Spectra', icon: 'query_stats', link: '/spectra' },
        { label: 'Spectra Similarities', icon: 'text_compare', link: '/spectrum-similarities' },
        { label: 'Samples', icon: 'labs', link: '/samples' },
        { label: 'Measuring Devices', icon: 'tablet_camera', link: '/measuring-devices' }
    ];

    constructor(private authService: AuthService) {
        this.loggedInUser$ = this.authService.loggedInUser$
    }

    toggleSidebar() {
        this.isSidebarExpanded = !this.isSidebarExpanded
    }
}
