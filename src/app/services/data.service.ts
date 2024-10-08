import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Spectrum } from '../models/spectrum'

@Injectable({
    providedIn: 'root',
})
export class DataService {
    mockSpectraList: Spectrum[] = [
        {
            id: 1,
            spectrumSamples: JSON.parse('{"wavelengths": [400, 500, 600, 700], "intensities": [0.4, 0.5, 0.6, 0.7]}'),
            measurementDate: new Date('2024-10-05'),
            spectrumTypeId: 1,
            deviceId: 101,
            userId: 10,
            createdAt: new Date('2024-10-01'),
            updatedAt: new Date('2024-10-02'),
        },
        {
            id: 2,
            spectrumSamples: JSON.parse('{"wavelengths": [450, 550, 650, 750], "intensities": [0.5, 0.6, 0.7, 0.8]}'),
            measurementDate: new Date('2024-09-28'),
            spectrumTypeId: 2,
            deviceId: 102,
            userId: 11,
            createdAt: new Date('2024-09-15'),
            updatedAt: new Date('2024-09-25'),
        },
        {
            id: 3,
            spectrumSamples: JSON.parse('{"wavelengths": [410, 510, 610, 710], "intensities": [0.3, 0.4, 0.5, 0.6]}'),
            measurementDate: new Date('2024-08-21'),
            spectrumTypeId: 3,
            deviceId: 103,
            userId: 12,
            createdAt: new Date('2024-08-01'),
            updatedAt: new Date('2024-08-10'),
        },
    ]

    constructor() {
    }

    getSpectrum(id: number): Observable<Spectrum | undefined> {
        return of(this.mockSpectraList.find(val => val.id === id))
    }
}
