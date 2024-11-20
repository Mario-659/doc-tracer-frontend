export interface MeasurementCondition {
    id: number;
    description: string;
    lightSource?: number;
    exposure?: number | null;
    gain?: number | null;
    brightness?: number | null;
}
