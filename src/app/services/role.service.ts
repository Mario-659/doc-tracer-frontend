import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { Role } from '../models/User'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

    constructor(private authService: AuthService) { }

    public hasRole(role: Role): boolean {
       return this.authService.loggedInUser$.value?.roles.includes(role) ?? false
    }
}
