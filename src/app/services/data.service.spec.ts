import { TestBed } from '@angular/core/testing'

import { DataService } from './data.service'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'

describe('DataService', () => {
    let service: DataService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClientTesting(), provideHttpClient()]
        })
        service = TestBed.inject(DataService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
