import { Config } from "./interfaces/config.interface";
import { Photo } from "./models/photo.class";

const CONFIG: Config = {
    apiUrl: 'https://picsum.photos/v2/list?limit=10&page=1'
}

let photos: Photo[] | undefined = undefined;

window.addEventListener('DOMContentLoaded', () => init());

async function init(): Promise<void> {
    await downloadPhotos();
}

async function downloadPhotos(): Promise<void> {
    try {
        const downloadResp: Response = await fetch(CONFIG.apiUrl);
        await onPhotosDownload(downloadResp);
    } catch(err) {
        console.error(err);
    }
}

async function onPhotosDownload(downloadResp: Response): Promise<void> {
    try {
        const photosData: any[] = await downloadResp.json();
        instantiatePhotos(photosData);
    } catch(err) {
        console.error(err);
    }
}

function instantiatePhotos(photosData: any[]) {
    photos = photosData.map(pd => new Photo(pd));
    console.log(photos);
}