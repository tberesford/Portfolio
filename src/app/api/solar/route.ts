import { BlobService } from "@/app/shared/services/BlobService";
import { ValidateService } from "@/app/shared/services/ValidateService";
import { SolarModel } from "@/app/solar/interfaces/solarmodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dayRange = searchParams.get("dayrange") ?? "";
    try{
        const blob = await BlobService(dayRange);
        const data = ValidateService<SolarModel>(blob);
        return NextResponse.json(data);
    } catch (error){
        return NextResponse.json(error);
    }
}
