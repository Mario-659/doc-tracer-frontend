import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditSampleComponent } from './edit-sample.component'
import { RouterModule } from '@angular/router'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('EditSpectrumComponent', () => {
    let component: EditSampleComponent
    let fixture: ComponentFixture<EditSampleComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditSampleComponent, RouterModule.forRoot([])],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(EditSampleComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
