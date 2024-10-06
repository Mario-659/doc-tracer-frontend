import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SamplesMainComponent } from './samples-main.component'

describe('SamplesMainComponent', () => {
    let component: SamplesMainComponent
    let fixture: ComponentFixture<SamplesMainComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SamplesMainComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SamplesMainComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
