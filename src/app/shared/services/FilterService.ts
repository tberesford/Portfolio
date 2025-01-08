export async function FilterData<T>(data: T[], properties: (keyof T)[], index: keyof T){
    return data.map(obj => ({
        [index]: obj[index],
        ...properties.reduce((result, property) => {
            result[property] = obj[property];
            return result;
        }, {} as Partial<T>)
    }));
}
