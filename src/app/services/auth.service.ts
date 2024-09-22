import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private tokenKey = 'auth_token';

    constructor(
        private http: HttpClient,
    ) { }

    login(username: string, password: string): Observable<any> {
        return this.http
            .post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
            .pipe(
                tap((response) => {
                    localStorage.setItem(this.tokenKey, response.token);
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
        localStorage.removeItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
