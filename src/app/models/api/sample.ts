export interface Sample {
    id: number
    name: string
    type: string // Enum: Reflectance, Absorption, etc.
    measurementId: number
    spectralData: string
    createdBy: string
    createdAt: string // ISO 8601 date string
    updatedAt: string // ISO 8601 date string
}

// export interface SpectralData {
//     dataPoints: DataPoint[];
// }
//
// export interface DataPoint {
//     wavelength: number; // e.g., 400, 401, etc.
//     intensity: number; // e.g., 26.06, 27.42, etc.
// }
