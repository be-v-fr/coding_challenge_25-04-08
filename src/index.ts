import { Config } from "./interfaces/config.interface";
import { Photo } from "./models/photo.class";

const CONFIG: Config = {
    apiUrl: 'https://picsum.photos/v2/list?limit=10&page=1'
}

let photos: Photo[] | undefined = undefined;

window.addEventListener('DOMContentLoaded', () => init());

function init(): void {
    downloadPhotos();
}

function downloadPhotos(): void {
    fetch(CONFIG.apiUrl)
        .then((downloadResp: Response) => onPhotosDownload(downloadResp))
        .catch((e: Error) => console.error(e));
}

function onPhotosDownload(downloadResp: Response) {
    downloadResp.json()
        .then((photosData: any[]) => instantiatePhotos(photosData))
        .catch((e: Error) => console.error(e));
}

function instantiatePhotos(photosData: any[]) {
    photos = photosData.map(pd => new Photo(pd));
    console.log(photos);
}