import { Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { authGuard } from './guards/auth.guard'
import { RegistrationComponent } from './components/registration/registration.component'
import { LogoutComponent } from './components/logout/logout.component'
import { SpectraMainComponent } from './components/spectra-main/spectra-main.component'
import { SpectrumSimilaritiesMainComponent } from './components/spectrum-similarities-main/spectrum-similarities-main.component'
import { SamplesMainComponent } from './components/samples-main/samples-main.component'
import { MeasuringDevicesMainComponent } from './components/sample-devices-main/measuring-devices-main.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { SpectrumDetailsComponent } from './components/spectrum-details/spectrum-details.component'
import { EditSpectrumComponent } from './components/edit-spectrum/edit-spectrum.component'
import { AdminControlComponent } from './components/admin-control/admin-control.component'

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegistrationComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
    },
    {
        path: 'spectra',
        component: SpectraMainComponent,
        canActivate: [authGuard],
    },
    {
        path: 'spectra/:id',
        component: SpectrumDetailsComponent,
        canActivate: [authGuard],
    },
    {
        path: 'spectra/:id/edit',
        component: EditSpectrumComponent,
        canActivate: [authGuard],
    },
    {
        path: 'spectrum-similarities',
        component: SpectrumSimilaritiesMainComponent,
        canActivate: [authGuard],
    },
    {
        path: 'samples',
        component: SamplesMainComponent,
        canActivate: [authGuard],
    },
    {
        path: 'measuring-devices',
        component: MeasuringDevicesMainComponent,
        canActivate: [authGuard],
    },
    {
        path: 'admin-control',
        component: AdminControlComponent,
        canActivate: [authGuard], // TODO add entitlements guard
    },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
]
