import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private tokenKey = 'auth_token';

    private readonly isBrowser: boolean;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    login(username: string, password: string): Observable<any> {
        return this.http
            .post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
            .pipe(
                tap((response) => {
                    if (this.isBrowser) {
                        localStorage.setItem(this.tokenKey, response.token);
                    }
                }),
                catchError(this.handleError('login', []))
            );
    }

    register(username: string, password: string, email: string, firstName: string, lastName: string): Observable<any> {
        this.logout();

        return this.http
            .post<{ token: string }>(`${this.apiUrl}/register`, { username, password, email, firstName, lastName })
            .pipe(
                catchError(this.handleError('register', []))
            );
    }

    logout(): void {
        if (this.isBrowser) {
            localStorage.removeItem(this.tokenKey);
        }
    }

    isAuthenticated(): boolean {
        if (this.isBrowser) {
            return !!localStorage.getItem(this.tokenKey);
        }
        return false;
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
