
export function ValidateService<T>(data: any): T[] | undefined {
    try{
        return data as T[];
    } catch (error) {
        return undefined;
    }
}