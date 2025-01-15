import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateSampleComponent } from './create-sample.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { RouterModule } from '@angular/router'

describe('CreateSampleComponent', () => {
    let component: CreateSampleComponent
    let fixture: ComponentFixture<CreateSampleComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateSampleComponent, RouterModule.forRoot([])],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(CreateSampleComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
