import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { LoginPayload } from '../models/login-payload'
import { RegisterPayload } from '../models/register-payload'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenKey = 'auth_token'
    private usernameKey = 'username'
    private loggedInUser = new BehaviorSubject<string | null>(null)

    public loggedInUser$ = this.loggedInUser.asObservable()

    constructor(private http: HttpClient) {
        const loggedInUser = this.getUser()
        if (loggedInUser) {
            this.loggedInUser.next(loggedInUser)
        }
    }

    login(payload: LoginPayload): Observable<any> {
        return this.http
            .post<{
                token: string
            }>(`${environment.apiUrl}/auth/login`, payload)
            .pipe(
                tap((response) => {
                    localStorage.setItem(this.tokenKey, response.token)
                    localStorage.setItem(this.usernameKey, payload.username)

                    this.loggedInUser.next(payload.username)
                })
            )
    }

    register(payload: RegisterPayload): Observable<any> {
        this.logout()

        return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/register`, payload)
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey)
        localStorage.removeItem(this.usernameKey)
        this.loggedInUser.next(null)
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.tokenKey)
    }

    getAuthToken(): string | null {
        return localStorage.getItem(this.tokenKey)
    }

    getUser(): string | null {
        return localStorage.getItem(this.usernameKey)
    }
}
