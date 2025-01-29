import { z } from 'zod';

const SolarModel = z.object({
    'TS': z.string(),
    'PERCENT_CHARGED': z.number(),
    'LOAD': z.number(),
    'SOLAR': z.number(),
    'RESERVE': z.number(),
    'GRID': z.number()
})

const SolarModels = z.array(SolarModel);

export default SolarModels;