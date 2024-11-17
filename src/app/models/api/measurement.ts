export interface Measurement {
    id: number;
    coveringMaterial: string;
    coveredMaterial: string;
    user: string;
    device: string;
    conditions: any;
    comments: string;
    measurementDate: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
