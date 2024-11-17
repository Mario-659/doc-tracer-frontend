export interface MeasurementCreateRequest {
    coveringMaterialId: number;
    coveredMaterialId: number;
    userId: number;
    deviceId: number;
    conditionsId: number;
    comments?: string;
    measurementDate: string;
}
