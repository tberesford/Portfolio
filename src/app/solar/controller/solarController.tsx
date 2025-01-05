import axios from "axios";
import { SolarModel } from "../models/solarmodel";

async function getSolarData(daterange: number): Promise<any>{
    return axios.get("/api/solar?dayrange=" + daterange);
}

function validateResponse(data: any): SolarModel[] | undefined {
    try{
        return data as SolarModel[];
    } catch (error) {
        return undefined;
    }
}

export default async function SolarController(dateRangeToGet: number) {
    const response = await getSolarData(dateRangeToGet);

    if(response.status==200){
        const data = validateResponse(response.data);
        if (data) {
            return {status: response.status, message: "Success", data: data}
        } else {
            return {status: 201, message: "Data not of expected type", data: undefined}
        }
    } else {
        return {status: response.status, message: "Server failure - no data response", data: undefined}
    }
}