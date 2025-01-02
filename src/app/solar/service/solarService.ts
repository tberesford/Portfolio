import SolarController from "../controller/solarController";


export default async function SolarService(){
    const response = await SolarController(1);
    if(response.status == 200){
        const dataItem = response.data;
        return dataItem;
    } else {
        return response.message;
    }
}