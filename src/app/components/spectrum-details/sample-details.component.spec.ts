import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SampleDetailsComponent } from './sample-details.component'
import { RouterModule } from '@angular/router'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('SpectrumDetailsComponent', () => {
    let component: SampleDetailsComponent
    let fixture: ComponentFixture<SampleDetailsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SampleDetailsComponent, RouterModule.forRoot([])],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(SampleDetailsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
