import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MeasurementDetailsComponent } from './measurement-details.component'
import { RouterModule } from '@angular/router'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('MeasurementDetailsComponent', () => {
    let component: MeasurementDetailsComponent
    let fixture: ComponentFixture<MeasurementDetailsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MeasurementDetailsComponent, RouterModule.forRoot([])],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(MeasurementDetailsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
