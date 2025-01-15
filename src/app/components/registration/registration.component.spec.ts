import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RegistrationComponent } from './registration.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { NotificationService } from '../../services/notification.service'
import { of } from 'rxjs'
import { By } from '@angular/platform-browser'

class MockAuthService {
    register() {
        return of({});
    }
}

class MockNotificationService {
    showNotification() {}
}

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;
    let authService: AuthService;
    let notificationService: NotificationService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RegistrationComponent,
                RouterModule.forRoot([]),
                ReactiveFormsModule
            ],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: NotificationService, useClass: MockNotificationService },
                provideHttpClientTesting(),
                provideHttpClient()
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        notificationService = TestBed.inject(NotificationService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with empty fields', () => {
        const form = component.registrationFormGroup;
        expect(form).toBeDefined();
        expect(form.get('username')?.value).toBe('');
        expect(form.get('password')?.value).toBe('');
        expect(form.get('email')?.value).toBe('');
        expect(form.get('firstName')?.value).toBe('');
        expect(form.get('lastName')?.value).toBe('');
    });

    it('should mark the form as invalid when fields are empty', () => {
        expect(component.registrationFormGroup.valid).toBeFalse();
    });

    it('should mark the form as valid when all fields are filled correctly', () => {
        component.registrationFormGroup.setValue({
            username: 'testuser',
            password: 'password123',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe'
        });
        expect(component.registrationFormGroup.valid).toBeTrue();
    });

    it('should disable the submit button when the form is invalid', () => {
        const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
        expect(button.disabled).toBeTrue();
    });

    it('should enable the submit button when the form is valid', () => {
        component.registrationFormGroup.setValue({
            username: 'testuser',
            password: 'password123',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe'
        });
        fixture.detectChanges();
        const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
        expect(button.disabled).toBeFalse();
    });

    it('should call AuthService.register on form submission', () => {
        const registerSpy = spyOn(authService, 'register').and.callThrough();
        component.registrationFormGroup.setValue({
            username: 'testuser',
            password: 'password123',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe'
        });
        component.register();
        expect(registerSpy).toHaveBeenCalledWith(component.registrationFormGroup.value);
    });
});

