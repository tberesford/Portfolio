import { BlobServiceClient } from "@azure/storage-blob";

export async function BlobService(day: string){       
    const service = BlobServiceClient.fromConnectionString(process.env.AZURE_CONN_STRING);
    const container = service.getContainerClient(process.env.CONTAINER);

    let blobName = '';
    switch(day){
        case '0': {
            blobName = 'all'
            break;
        }
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
    var data;
    try{
        const blob = container.getBlobClient(blobName + "Data.json");
        const download = await blob.downloadToBuffer();
        data = await JSON.parse(download.toString());
        return data;
    } catch (error){
        return error;
    }   
}