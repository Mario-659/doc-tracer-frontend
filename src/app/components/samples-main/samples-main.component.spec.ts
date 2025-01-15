import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SamplesMainComponent } from './samples-main.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('SamplesMainComponent', () => {
    let component: SamplesMainComponent
    let fixture: ComponentFixture<SamplesMainComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SamplesMainComponent],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(SamplesMainComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
