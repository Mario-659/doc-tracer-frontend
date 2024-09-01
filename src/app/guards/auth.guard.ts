import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
        const router = inject(Router);
        const isAuthenticated = inject(AuthService).isAuthenticated();

        if (!isAuthenticated) {
            console.error('error while authenticating')
            router.navigate(['/login']);
            return false;
        }

        return true;
}
