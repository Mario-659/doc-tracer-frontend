import { Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { authGuard } from './guards/auth.guard'
import { RegistrationComponent } from './components/registration/registration.component'
import { LogoutComponent } from './components/logout/logout.component'
import { SamplesComponent } from './components/spectra-main/samples.component'
import { SpectrumSimilaritiesMainComponent } from './components/spectrum-similarities-main/spectrum-similarities-main.component'
import { SamplesMainComponent } from './components/samples-main/samples-main.component'
import { MeasuringDevicesMainComponent } from './components/sample-devices-main/measuring-devices-main.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { SampleDetailsComponent } from './components/spectrum-details/sample-details.component'
import { EditSampleComponent } from './components/edit-spectrum/edit-sample.component'
import { AdminControlComponent } from './components/admin-control/admin-control.component'
import { MeasurementsComponent } from './components/measurements/measurements.component'
import { MeasurementDetailsComponent } from './components/measurement-details/measurement-details.component'
import { CreateSampleComponent } from './components/create-sample/create-sample.component'
import { EditMeasurementComponent } from './components/edit-measurement/edit-measurement.component'
import { NewMeasurementComponent } from './components/new-measurement/new-measurement.component'
import { roleGuard } from './guards/role.guard'
import { Role } from './models/User'

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
        path: 'measurements',
        component: MeasurementsComponent,
        canActivate: [authGuard, roleGuard],
        data: {role: Role.VIEWER}
    },
    {
        path: 'measurements/:id',
        component: MeasurementDetailsComponent,
        canActivate: [authGuard, roleGuard],
        data: {role: Role.VIEWER}
    },
    {
        path: 'measurements/:id/edit',
        component: EditMeasurementComponent,
        canActivate: [authGuard, roleGuard],
        data: {role: Role.EDITOR}
    },
    {
        path: 'create-measurement',
        component: NewMeasurementComponent,
        canActivate: [authGuard, roleGuard],
        data: {role: Role.EDITOR}
    },
    {
        path: 'samples',
        component: SamplesComponent,
        canActivate: [authGuard, roleGuard],
        data: {role: Role.VIEWER}
    },
    {
        path: 'samples/:id',
        component: SampleDetailsComponent,
        canActivate: [authGuard, roleGuard],
        data: {role: Role.VIEWER}
    },
    {
        path: 'create-sample',
        component: CreateSampleComponent,
        canActivate: [authGuard, roleGuard],
        data: {role: Role.EDITOR}
    },
    {
        path: 'samples/:id/edit',
        component: EditSampleComponent,
        canActivate: [authGuard, roleGuard],
        data: {role: Role.EDITOR}
    },
    {
        path: 'spectrum-similarities',
        component: SpectrumSimilaritiesMainComponent,
        canActivate: [authGuard, roleGuard],
        data: {role: Role.VIEWER}
    },
    {
        path: 'measuring-devices',
        component: MeasuringDevicesMainComponent,
        canActivate: [authGuard, roleGuard],
        data: {role: Role.VIEWER}
    },
    {
        path: 'admin-control',
        component: AdminControlComponent,
        canActivate: [authGuard, roleGuard],
        data: {role: Role.ADMIN}
    },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
]
