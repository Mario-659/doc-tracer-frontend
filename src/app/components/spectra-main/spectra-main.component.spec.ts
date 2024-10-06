import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SpectraMainComponent } from './spectra-main.component'

describe('SpectraMainComponent', () => {
    let component: SpectraMainComponent
    let fixture: ComponentFixture<SpectraMainComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SpectraMainComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SpectraMainComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
