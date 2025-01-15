import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SamplesComponent } from './samples.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('SpectraMainComponent', () => {
    let component: SamplesComponent
    let fixture: ComponentFixture<SamplesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SamplesComponent],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(SamplesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
