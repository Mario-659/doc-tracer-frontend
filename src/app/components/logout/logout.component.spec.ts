import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LogoutComponent } from './logout.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('LogoutComponent', () => {
    let component: LogoutComponent
    let fixture: ComponentFixture<LogoutComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LogoutComponent],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(LogoutComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
