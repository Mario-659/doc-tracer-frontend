import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenKey = 'auth_token';

    constructor(
        private http: HttpClient,
    ) { }

    login(username: string, password: string): Observable<any> {
        return this.http
            .post<{ token: string }>(`${environment.apiUrl}/login`, { username, password })
            .pipe(
                tap((response) => {
                    localStorage.setItem(this.tokenKey, response.token);
                }),
            );
    }

    register(username: string, password: string, email: string, firstName: string, lastName: string): Observable<any> {
        this.logout();

        return this.http
            .post<{ token: string }>(`${environment.apiUrl}/register`, { username, password, email, firstName, lastName })
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    getAuthToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
}
