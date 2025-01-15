import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditMeasurementComponent } from './edit-measurement.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { RouterModule } from '@angular/router'

describe('EditMeasurementComponent', () => {
    let component: EditMeasurementComponent
    let fixture: ComponentFixture<EditMeasurementComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditMeasurementComponent, RouterModule.forRoot([])],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(EditMeasurementComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
