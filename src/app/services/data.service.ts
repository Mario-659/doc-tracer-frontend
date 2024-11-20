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
import { User } from '../models/User'
import { UserResponse } from '../models/api/user-response'
import { Measurement } from '../models/api/measurement'
import { MeasurementCreateRequest } from '../models/api/measurement-create-request'
import { SampleUpdateRequest } from '../models/api/sample-update-request'

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

    getSamplesByMeasurementId(measurementId: number): Observable<Sample[]> {
        return this.http.get<Sample[]>(`${environment.apiUrl}/measurements/${measurementId}/samples`)
    }

    getSample(id: number): Observable<Sample> {
        return this.http.get<Sample>(`${environment.apiUrl}/samples/${id}`)
    }

    updateSample(id: number, updateRequest: SampleUpdateRequest) {
        return this.http.put<void>(`${environment.apiUrl}/samples/${id}`, updateRequest)
    }

    deleteSample(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/samples/${id}`)
    }

    getUsers(): Observable<UserResponse[]> {
        return this.http.get<UserResponse[]>(`${environment.apiUrl}/admin/users`)
    }

    updateUsers(payload: any[]) {
        return this.http.put(`${environment.apiUrl}/admin/users/bulk-update`, payload)
    }

    getMeasurements(): Observable<Measurement[]> {
        return this.http.get<Measurement[]>(`${environment.apiUrl}/measurements`);
    }

    getMeasurement(id: number): Observable<Measurement> {
        return this.http.get<Measurement>(`${environment.apiUrl}/measurements/${id}`);
    }

    createMeasurement(payload: MeasurementCreateRequest): Observable<Measurement> {
        return this.http.post<Measurement>(`${environment.apiUrl}/measurements`, payload);
    }

    updateMeasurement(id: number, payload: Partial<MeasurementCreateRequest>): Observable<Measurement> {
        return this.http.put<Measurement>(`${environment.apiUrl}/measurements/${id}`, payload);
    }

    deleteMeasurement(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/measurements/${id}`);
    }

}
