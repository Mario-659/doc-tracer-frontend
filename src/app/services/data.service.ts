import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Spectrum } from '../models/spectrum'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { SpectrumGridRow } from '../models/spectrum-grid-row'

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
}
