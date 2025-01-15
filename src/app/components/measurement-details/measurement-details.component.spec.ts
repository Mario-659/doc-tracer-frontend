import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeasurementDetailsComponent } from './measurement-details.component';
import { RouterModule } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { of } from 'rxjs';

class MockDataService {
    getMeasurement(id: number) {
        return of({
            id,
            name: 'Test Measurement',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-02',
            coveringMaterial: 'Material A',
            coveredMaterial: 'Material B',
            device: 'Device X',
            user: 'User 1',
            comments: 'No comments',
            measurementDate: '2024-01-01T10:00:00Z',
            conditions: {
                description: 'Standard conditions',
                lightSource: 'LED',
                exposure: 'High',
                gain: 'Medium',
                brightness: '70%'
            }
        });
    }

    getSamplesByMeasurementId(id: number) {
        return of([
            { id: 1, name: 'Sample 1', type: 'Type A', createdAt: '2024-01-01', updatedAt: '2024-01-02' },
        ]);
    }

    deleteMeasurement(id: number) {
        return of({});
    }
}

class MockNotificationService {
    showNotification(notification: any) {}
}

describe('MeasurementDetailsComponent', () => {
    let component: MeasurementDetailsComponent;
    let fixture: ComponentFixture<MeasurementDetailsComponent>;
    let mockDataService: DataService;
    let mockNotificationService: NotificationService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MeasurementDetailsComponent, RouterModule.forRoot([])],
            providers: [
                { provide: DataService, useClass: MockDataService },
                { provide: NotificationService, useClass: MockNotificationService },
                provideHttpClientTesting(),
                provideHttpClient(),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MeasurementDetailsComponent);
        component = fixture.componentInstance;
        mockDataService = TestBed.inject(DataService);
        mockNotificationService = TestBed.inject(NotificationService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch measurement details on init', () => {
        component.ngOnInit();
        fixture.detectChanges();
        component.measurement$?.subscribe((measurement) => {
            expect(measurement).toEqual({
                id: 0,
                name: 'Test Measurement',
                createdAt: '2024-01-01',
                updatedAt: '2024-01-02',
                coveringMaterial: 'Material A',
                coveredMaterial: 'Material B',
                device: 'Device X',
                user: 'User 1',
                comments: 'No comments',
                measurementDate: '2024-01-01T10:00:00Z',
                conditions: {
                    //@ts-ignore
                    description: 'Standard conditions', lightSource: 'LED', exposure: 'High', gain: 'Medium', brightness: '70%'
                }
            });
        });
    });

    it('should fetch samples associated with the measurement', () => {
        component.ngOnInit();
        fixture.detectChanges();
        component.samples$?.subscribe((samples) => {
            expect(samples).toEqual([
                //@ts-ignore
                { id: 1, name: 'Sample 1', type: 'Type A', createdAt: '2024-01-01', updatedAt: '2024-01-02' },
            ]);
        });
    });

    it('should toggle expanded sections', () => {
        component.toggleSection('properties');
        expect(component.expandedSections.properties).toBeFalse();
        component.toggleSection('properties');
        expect(component.expandedSections.properties).toBeTrue();
    });

    it('should navigate to sample details on cell click', () => {
        const routerSpy = spyOn(component['router'], 'navigate');
        component['goToSampleDetails'](1);
        expect(routerSpy).toHaveBeenCalledWith(['/samples', 1]);
    });

    it('should navigate to edit measurement page', () => {
        const routerSpy = spyOn(component['router'], 'navigate');
        component.goToEditMeasurement(1);
        expect(routerSpy).toHaveBeenCalledWith(['/measurements', 1, 'edit']);
    });
});
