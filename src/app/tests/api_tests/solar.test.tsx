import { SolarModel } from "@/app/solar/interfaces/solarmodel";
import axios from "axios";
import exp from "constants";


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedData: SolarModel[] = [{
    TS: new Date(),
    GRID: 0,
    SOLAR: 0,
    PERCENT_CHARGED: 0,
    LOAD: 0,
    RESERVE: 0
}];

describe('/api/solar', () => {
    it("Should return a 200 response for /api/solar?dayrange=1", async () => {
        mockedAxios.get.mockResolvedValueOnce({data: mockedData, status: 200});
        const response = await axios.get("/api/solar?dayrange=1");
        expect(response.status).toEqual(200);
    });

    it("Should return a solar model object", async () => {
        mockedAxios.get.mockResolvedValueOnce({data: mockedData, status: 200});
        const response = await axios.get("/api/solar?dayrange=1");
        expect(response.data).toEqual(mockedData);
    });

    test.todo("Should filter data");

    test.todo("Should return different datasets");
})