// import { FilterData } from "@/services/FilterService";
// import SolarModel from "@/models/solarmodel";
// import axios from "axios";

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('/api/solar', () => {
//     let mockedData: SolarModel[]; 
//     let mockedFilteredData: Partial<SolarModel>[];
//     beforeAll(() => {
//         mockedData = [{
//             TS: new Date(),
//             GRID: 0,
//             SOLAR: 0,
//             PERCENT_CHARGED: 0,
//             LOAD: 0,
//             RESERVE: 0
//         }];

//         mockedFilteredData = [{
//             TS: new Date(),
//             GRID: 0,
//             SOLAR: 0
//         }];
//     })

//     it("Should return a 200 response", async () => {
//         mockedAxios.get.mockResolvedValueOnce({data: mockedData, status: 200});
//         const response = await axios.get("/api/solar?dayrange=1");
//         expect(response.status).toEqual(200);
//     });

//     it("Should return a solar model object", async () => {
//         mockedAxios.get.mockResolvedValueOnce({data: mockedData, status: 200});
//         const response = await axios.get("/api/solar?dayrange=1");
//         expect(response.data).toEqual(mockedData);
//     });

//     it("Should filter data", async () => {
//         mockedAxios.get.mockResolvedValueOnce({data: mockedData, status: 200});
//         const response = await axios.get("/api/solar?dayrange=1");
//         const filteredData = await FilterData(response.data, ['SOLAR', 'GRID'], 'TS');
//         expect(filteredData).toEqual(mockedFilteredData);
//     });

//     test.todo("Should return different datasets");
// })