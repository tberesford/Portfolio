import { SolarArray, SolarObject } from "@/types/SolarTypes";

export class SolarService{
    private readonly interval = 15;

    private ReturnNearestMinute(date: Date, minute: number): Date {
        const currentMinute = date.getTime();
        const nearestMinute = Math.round(currentMinute / (minute * 60 * 1000)) * (minute * 60 * 1000);
        return new Date(nearestMinute);
    }

    public AggregateData(rawData: SolarArray){
        const aggregatedData: SolarArray = [];
        let newObject: SolarObject = {
            TS: "",
            PERCENT_CHARGED: 0,
            LOAD: 0,
            SOLAR: 0,
            GRID: 0
        };

        for (const item of rawData) {
            const roundedDate = this.ReturnNearestMinute(new Date(item.TS), this.interval);
            
            const matchingEntry = new Date(item.TS).getTime() === roundedDate.getTime();

            if (!matchingEntry) {
                newObject.SOLAR += item.SOLAR;
                newObject.GRID += item.GRID;
                newObject.LOAD += item.LOAD;
                newObject.PERCENT_CHARGED += item.PERCENT_CHARGED;
            } else {
                newObject.TS = roundedDate.toISOString();
                newObject.GRID = Math.round((newObject.GRID / 2) * 100) / 100;
                newObject.LOAD =  Math.round((newObject.LOAD / 2) * 100) / 100;
                newObject.PERCENT_CHARGED =  Math.round(newObject.PERCENT_CHARGED / 2);
                newObject.SOLAR =  Math.round((newObject.SOLAR / 2) * 100) / 100;

                aggregatedData.push(newObject);
                newObject = { 
                    TS: "",
                    PERCENT_CHARGED: 0,
                    LOAD: 0,
                    SOLAR: 0,
                    GRID: 0
                }
            }
        }
        return aggregatedData;
    }
}
