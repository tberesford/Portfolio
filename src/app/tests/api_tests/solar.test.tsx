import axios from "axios";
import SolarController from "@/app/solar/controller/solarController";

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Solar API tests', () => {
    test.todo("Should return a 200 response");
    test.todo("Should return a solar model object");
    test.todo("Should filter data");
    test.todo("Should NOT return a failed request");
})