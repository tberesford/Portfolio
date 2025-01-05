import axios from "axios";
import SolarController from "@/app/solar/controller/solarController";
import { SolarModel } from "@/app/solar/models/solarmodel";

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('/api/solar', () => {
    it("Should return a 200 response", async () => {
        const mockData: SolarModel[] = [{
            TS: new Date(),
            PERCENT_CHARGED: 0,
            LOAD: 0,
            SOLAR: 0,
            RESERVE: 0,
            GRID: 0
        }];

        mockAxios.get.mockResolvedValueOnce({status: 200, message: "Success", data: mockData});
        const result = await SolarController(1);

        expect(mockAxios.get).toHaveBeenCalledWith("/api/solar?dayrange=1");
        expect(result.status).toEqual(200);
    });

    test.todo("Should return a solar model object");
    test.todo("Should filter data");
    test.todo("Should NOT return a failed request");
})