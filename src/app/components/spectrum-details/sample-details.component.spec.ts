import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SampleDetailsComponent } from './sample-details.component'

describe('SpectrumDetailsComponent', () => {
    let component: SampleDetailsComponent
    let fixture: ComponentFixture<SampleDetailsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SampleDetailsComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SampleDetailsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
