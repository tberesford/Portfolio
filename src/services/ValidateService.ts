import { z } from 'zod';

export default function ValidateService<T>(schema: z.ZodSchema<T>, data: any) {
    const result = schema.safeParse(data);
    if(!result.success){ return { error: result.error.format() } }
    return result.data;
}