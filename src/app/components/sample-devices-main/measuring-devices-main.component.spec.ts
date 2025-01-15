import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MeasuringDevicesMainComponent } from './measuring-devices-main.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('SampleDevicesMainComponent', () => {
    let component: MeasuringDevicesMainComponent
    let fixture: ComponentFixture<MeasuringDevicesMainComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MeasuringDevicesMainComponent],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(MeasuringDevicesMainComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
