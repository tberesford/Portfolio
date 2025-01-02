import axios from "axios";
import { SolarModel } from "../models/solarmodel";

export default async function SolarController(dateRangeToGet: number) {
    const response = await axios.get("/api/solar?dayrange="+dateRangeToGet);
    var data: SolarModel[];

    if(response.status==200){
        try{
            data = response.data;
            return {status: response.status, message: "Success", data: data}
        } catch (e) {
            return {status: 201, message: "Data not of expected type", data: undefined}
        }
    } else {
        return {status: response.status, message: "Server failure - no data response", data: undefined}
    }
}