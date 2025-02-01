import { SolarModel, SolarModels } from "@/models/solarmodel";
import { z } from "zod";

type SolarObject = z.infer<typeof SolarModel>;
type SolarArray = z.infer<typeof SolarModels>;

export type { SolarObject, SolarArray };