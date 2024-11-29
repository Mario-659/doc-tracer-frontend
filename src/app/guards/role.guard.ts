import { CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { NotificationService } from '../services/notification.service'
import { AppNotification, NotificationType } from '../models/notification'

export const roleGuard: CanActivateFn = (route, state) => {
    const role = route.data['role']

    if (inject(AuthService).loggedInUser$.value?.roles.includes(role)) {
        return true
    }

    inject(NotificationService).showNotification(
        new AppNotification('You are not entitled to this action', NotificationType.warning)
    )

    return false
}
