import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { LoginPayload } from '../models/api/login-payload'
import { RegisterPayload } from '../models/api/register-payload'
import { jwtDecode } from 'jwt-decode'
import { User } from '../models/User'

const TOKEN_LOCALSTORAGE_KEY = 'jwt_token'
const USER_LOCALSTORAGE_KEY = 'jwt_user'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loggedInUser = new BehaviorSubject<User | null>(null)

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
                    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, response.token)

                    const decoded: any = jwtDecode(response.token)
                    const user: User = {
                        username: decoded.sub,
                        roles: decoded.roles,
                        expirationTimestamp: decoded.exp,
                    }

                    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user))
                    this.loggedInUser.next(user)
                })
            )
    }

    register(payload: RegisterPayload): Observable<any> {
        this.logout()

        return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/register`, payload)
    }

    logout(): void {
        localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY)
        localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        this.loggedInUser.next(null)
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)
    }

    getAuthToken(): string | null {
        return localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)
    }

    private getUser(): User | null {
        const value = localStorage.getItem(USER_LOCALSTORAGE_KEY)
        if (value) return JSON.parse(value)
        return null
    }
}
