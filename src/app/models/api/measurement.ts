import { MeasurementCondition } from './measurement-condition'

export interface Measurement {
    id: number;
    coveringMaterial: string;
    coveredMaterial: string;
    user: string;
    device: string;
    conditions: MeasurementCondition;
    comments: string;
    measurementDate: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
