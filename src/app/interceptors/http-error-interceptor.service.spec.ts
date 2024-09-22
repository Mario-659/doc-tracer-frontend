import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpError } from '../model/http-error';
import { HttpErrorInterceptor } from "./http-error-interceptor.service";

describe('HttpErrorInterceptor', () => {
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });

        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should handle client-side errors', (done) => {
        const mockError = new ProgressEvent('Network error');

        httpClient.get('/data').subscribe({
            next: () => fail('expected an error'),
            error: (error: HttpError) => {
                expect(error.type).toBe('Client-side');
                expect(error.message).toBe('Client-side error');
                done();
            }
        });

        const req = httpMock.expectOne('/data');
        req.error(mockError);
    });

    it('should handle server-side errors', (done) => {
        const mockErrorResponse = new HttpErrorResponse({
            status: 500,
            statusText: 'Server Error',
            error: { message: 'Server-side error' }
        });

        httpClient.get('/data').subscribe({
            next: () => fail('expected an error'),
            error: (error: HttpError) => {
                expect(error.type).toBe('Server-side');
                expect(error.message).toBe('Server-side error');
                expect(error.status).toBe(500);
                done();
            }
        });

        const req = httpMock.expectOne('/data');
        req.flush({ message: 'Server-side error' }, { status: 500, statusText: 'Server Error' });
    });
});

