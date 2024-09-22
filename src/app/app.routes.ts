import { Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { authGuard } from './guards/auth.guard'
import { RegistrationComponent } from './components/registration/registration.component'

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
]
