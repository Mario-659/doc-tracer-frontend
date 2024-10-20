import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { authInterceptor } from './interceptors/auth.interceptor'
import { httpErrorNotificationInterceptor } from './interceptors/http-error-notification.interceptor'
import { httpUnauthorizedErrorInterceptor } from './interceptors/http-unauthorized-error.interceptor'

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([authInterceptor, httpErrorNotificationInterceptor, httpUnauthorizedErrorInterceptor])
        ),
    ],
}
