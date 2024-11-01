import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Spectrum } from '../models/api/spectrum'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { SpectrumGridRow } from '../models/api/spectrum-grid-row'
import { Device } from '../models/api/device'
import { SpectrumType } from '../models/api/spectrum-type'
import { SpectrumUpdateRequest } from '../models/api/spectrum-update-request'
import { Sample } from '../models/api/sample'

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private http: HttpClient) {}

    getSpectra(): Observable<SpectrumGridRow[]> {
        return this.http.get<SpectrumGridRow[]>(`${environment.apiUrl}/spectra`)
    }

    getSpectrum(id: number): Observable<Spectrum> {
        return this.http.get<Spectrum>(`${environment.apiUrl}/spectra/${id}`)
    }

    deleteSpectrum(id: number) {
        return this.http.delete<void>(`${environment.apiUrl}/spectra/${id}`)
    }

    getDevices() {
        return this.http.get<Device[]>(`${environment.apiUrl}/devices`)
    }

    getSpectrumTypes() {
        return this.http.get<SpectrumType[]>(`${environment.apiUrl}/spectra-types`)
    }

    updateSpectrum(spectrumId: number, updateRequest: SpectrumUpdateRequest) {
        return this.http.put(`${environment.apiUrl}/spectra/${spectrumId}`, updateRequest)
    }

    getSamples(): Observable<Sample[]> {
        return this.http.get<Sample[]>(`${environment.apiUrl}/samples`)
    }

    getSample(id: number): Observable<Sample> {
        return this.http.get<Sample>(`${environment.apiUrl}/samples/${id}`)
    }
}
