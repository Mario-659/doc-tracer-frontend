import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SidebarComponent } from './sidebar.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { RouterModule } from '@angular/router'

describe('SidebarComponent', () => {
    let component: SidebarComponent
    let fixture: ComponentFixture<SidebarComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SidebarComponent, RouterModule.forRoot([])],
            providers: [provideHttpClientTesting(), provideHttpClient()]
        }).compileComponents()

        fixture = TestBed.createComponent(SidebarComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
