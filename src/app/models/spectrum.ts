export interface Spectrum {
    id: number,
    spectrumSamples: JSON,
    measurementDate: Date,
    spectrumTypeId: number,
    deviceId: number,
    userId: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date
}
