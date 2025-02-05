import { BlobService } from "@/services/BlobService";
import SolarControllerService from "@/services/SolarControllerService";
import { SolarModels } from "@/models/solarmodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dayRange = searchParams.get("dayrange") ?? "";
    try{
        const blob = await BlobService(dayRange);
        const data = SolarControllerService(SolarModels, blob);
        return NextResponse.json({status: 200, data});
    } catch (error: any){
        return NextResponse.json({status: 500, error: error instanceof Error ? error.message : String(error)});
    }
}
