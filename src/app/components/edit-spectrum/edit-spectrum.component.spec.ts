import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditSpectrumComponent } from './edit-spectrum.component'

describe('EditSpectrumComponent', () => {
    let component: EditSpectrumComponent
    let fixture: ComponentFixture<EditSpectrumComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditSpectrumComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(EditSpectrumComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
