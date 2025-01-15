import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AdminControlComponent } from './admin-control.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('AdminControlComponent', () => {
    let component: AdminControlComponent
    let fixture: ComponentFixture<AdminControlComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminControlComponent],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(AdminControlComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
