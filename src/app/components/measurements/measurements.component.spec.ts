import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MeasurementsComponent } from './measurements.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('MeasurementsComponent', () => {
    let component: MeasurementsComponent
    let fixture: ComponentFixture<MeasurementsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MeasurementsComponent],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(MeasurementsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
