import { BlobServiceClient } from "@azure/storage-blob";
import { NextRequest } from "next/server";

async function ParseData(day: string){       
    const service = BlobServiceClient.fromConnectionString(azureConnString);
    const container = service.getContainerClient(containerString);

    let blobName = '';
    switch(day){
        // case '0': {  // This needs data compiling security due to file size
        //     blobName = 'all' + blobName;
        //     break;
        // }
        case '1': {
            blobName = 'day';
            break;
        }
        case '7': {
            blobName = 'week';
            break;
        }
        case '31': {
            blobName = 'month';
            break;
        }
    }

    const blob = container.getBlobClient(blobName + blobNameExtension);
    const download = await blob.downloadToBuffer();
    const data = await JSON.parse(download.toString());
    return data;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dayRange = searchParams.get("dayrange") ?? "";
    if(dayRange){
        return Response.json(await ParseData(dayRange));
    }
    return Response.json("Error!");
}
