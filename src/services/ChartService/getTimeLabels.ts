import { SolarArray } from "@/types/SolarTypes";

export default function GetTimeLabels(data: SolarArray){
    const newTimeArray: string[] = [];
    data.forEach((item) => {
        if(new Date(item.TS).getMinutes() == 0){
            newTimeArray.push(item.TS)
        }
    })
    return newTimeArray;
}
