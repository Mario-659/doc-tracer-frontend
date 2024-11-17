export interface Measurement {
    id: number;
    coveringMaterialId: number;
    coveredMaterialId: number;
    userId: number;
    deviceId: number;
    conditionsId: number;
    comments: string;
    measurementDate: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
