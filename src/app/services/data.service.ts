import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Spectrum } from '../models/spectrum'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { SpectrumGridRow } from '../models/spectrum-grid-row'
import { tap } from 'rxjs/operators'
import { Device } from '../models/device'
import { SpectrumType } from '../models/spectrum-type'
import { SpectrumUpdateRequest } from '../models/spectrum-update-request'

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
}
