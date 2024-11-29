import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common'
import { AuthService } from '../../services/auth.service'
import { Observable } from 'rxjs'
import { Role, User } from '../../models/User'
import { RoleService } from '../../services/role.service'

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgClass, NgForOf, NgIf, NgOptimizedImage, AsyncPipe],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
    protected readonly Role = Role

    isSidebarExpanded = false
    protected loggedInUser$: Observable<User | null>
    navItems = [
        // { label: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
        { label: 'Measurements', icon: 'query_stats', link: '/measurements' },
        { label: 'Spectra Similarities', icon: 'text_compare', link: '/spectrum-similarities' },
        { label: 'Samples', icon: 'labs', link: '/samples' },
        { label: 'Measuring Devices', icon: 'tablet_camera', link: '/measuring-devices' },
    ]

    constructor(
        private authService: AuthService,
        protected roleService: RoleService
    ) {
        this.loggedInUser$ = this.authService.loggedInUser$
    }

    toggleSidebar() {
        this.isSidebarExpanded = !this.isSidebarExpanded
    }
}
