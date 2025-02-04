import { z } from 'zod';
import { SolarService } from './SolarService';

const solarService = new SolarService();

export default function SolarControllerService<SolarArray extends { TS: string; PERCENT_CHARGED: number; LOAD: number; SOLAR: number; GRID: number }[]>(schema: z.ZodSchema<SolarArray>, data: any) {
    const result = schema.safeParse(data);
    if(!result.success){ return { error: result.error.format() } }

    const formattedData: SolarArray = result.data;
    return solarService.AggregateData(formattedData);
}