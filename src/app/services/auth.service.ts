import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { LoginPayload } from '../models/login-payload'
import { RegisterPayload } from '../models/register-payload'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenKey = 'auth_token'

    constructor(private http: HttpClient) {}

    login(payload: LoginPayload): Observable<any> {
        return this.http
            .post<{
                token: string
            }>(`${environment.apiUrl}/login`, payload)
            .pipe(
                tap((response) => {
                    localStorage.setItem(this.tokenKey, response.token)
                })
            )
    }

    register(payload: RegisterPayload): Observable<any> {
        this.logout()

        return this.http.post<{ token: string }>(`${environment.apiUrl}/register`, payload)
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey)
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.tokenKey)
    }

    getAuthToken(): string | null {
        return localStorage.getItem(this.tokenKey)
    }
}
