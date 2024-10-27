import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common'

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
    ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    isSidebarExpanded = false;
    navItems = [
        { label: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
        { label: 'Spectra', icon: 'insights', link: '/spectra' },
        { label: 'Spectra Similarities', icon: 'compare', link: '/spectrum-similarities' },
        { label: 'Samples', icon: 'inventory', link: '/samples' },
        { label: 'Measuring Devices', icon: 'precision_manufacturing', link: '/measuring-devices' }
    ];

    toggleSidebar() {
        this.isSidebarExpanded = !this.isSidebarExpanded
    }
}
