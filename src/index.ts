import { Config } from "./interfaces/config.interface";
import { Photo } from "./models/photo.class";
import { getSlideshowTemplate, getCarouselDotTemplate } from "./templates/slideshow";

const CONFIG: Config = {
    apiUrl: 'https://picsum.photos/v2/list?limit=10&page=1'
}

let photos: Photo[] | undefined = undefined;
let currPhotoId: number = 0;

window.addEventListener('DOMContentLoaded', () => init());


async function init(): Promise<void> {
    await downloadPhotos();
    if (photos && photos.length > 0) {
        renderSlideshow(photos[currPhotoId]);
    }
}


async function downloadPhotos(): Promise<void> {
    try {
        const downloadResp: Response = await fetch(CONFIG.apiUrl);
        await onPhotosDownload(downloadResp);
    } catch (err) {
        console.error(err);
    }
}


async function onPhotosDownload(downloadResp: Response): Promise<void> {
    try {
        const photosData: any[] = await downloadResp.json();
        instantiatePhotos(photosData);
    } catch (err) {
        console.error(err);
    }
}


function instantiatePhotos(photosData: any[]) {
    photos = photosData.map(pd => new Photo(pd));
}


function renderSlideshow(photo: Photo) {
    const contentEl: HTMLElement | null = document.getElementById('content');
    if (contentEl) {
        contentEl.innerHTML = getSlideshowTemplate(photo);
        renderCarouselDots();
    }
}


function renderCarouselDots() {
    const dotsEl: HTMLElement | null = document.getElementById('carouselDots');
    if (dotsEl) {
        dotsEl.innerHTML = '';
        photos?.forEach((p: Photo) => {
            const isCurrentPhoto: boolean = (p.id === currPhotoId);
            dotsEl.innerHTML += getCarouselDotTemplate(p.id, isCurrentPhoto);
        });
    }
}


function showPhoto(photoId: number) {
    const photoEl: HTMLElement | null = document.getElementById('photo');
    if (!photoEl || !photos) return;
    photoId = (photoId + photos.length) % photos.length;
    currPhotoId = photoId;
    renderCarouselDots();
    (photoEl as HTMLImageElement).src = photos[photoId].download_url;
}
(window as any).showPhoto = showPhoto;


function slidePhoto(dir: 'next' | 'previous') {
    const photoId: number = (dir === 'next' ? currPhotoId + 1 : currPhotoId - 1);
    showPhoto(photoId);
}
(window as any).slidePhoto = slidePhoto;