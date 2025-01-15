import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RegistrationComponent } from './registration.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { RouterModule } from '@angular/router'

describe('RegistrationComponent', () => {
    let component: RegistrationComponent
    let fixture: ComponentFixture<RegistrationComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RegistrationComponent, RouterModule.forRoot([])],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(RegistrationComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
