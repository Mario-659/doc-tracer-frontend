import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SpectrumSimilaritiesMainComponent } from './spectrum-similarities-main.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('SpectrumSimilaritiesMainComponent', () => {
    let component: SpectrumSimilaritiesMainComponent
    let fixture: ComponentFixture<SpectrumSimilaritiesMainComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SpectrumSimilaritiesMainComponent],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(SpectrumSimilaritiesMainComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
