export async function FilterData<T>(data: T[], property: keyof T, index: keyof T){
    return data.map(obj => ({
        [index]: obj[index],
        [property]: obj[property]
    }));
}
