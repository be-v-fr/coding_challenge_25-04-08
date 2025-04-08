import { Config } from "./interfaces/config.interface";
import { Photo } from "./models/photo.class";

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
        photos?.forEach((p: Photo) => dotsEl.innerHTML += getCarouselDotTemplate(p.id));
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


function getSlideshowTemplate(photo: Photo): string {
    return /* html */`
    <div class="slideshow-container f-center f-column">
        <div class="slideshow-main">
            <div class="f-center">
                <button class="circular-btn" onclick="slidePhoto('previous')">
                    <i class="arrow rotate-180"></i>
                </button>
            </div>
            <img id="photo" src="${photo.download_url}" alt="Photo by ${photo.author}" />
            <div class="f-center">
                <button class="circular-btn" onclick="slidePhoto('next')">
                    <i class="arrow"></i>
                </button>
            </div>
            <div class="grid-placeholder"></div>
            <section class="info">
                <span>${photo.author}</span>
                <a target="blank" href="${photo.url}">Source</a>
            </section>
            <div class="grid-placeholder"></div>
        </div>
        <div id="carouselDots" class="f-center"></div>
    </div>
    `;
}


function getCarouselDotTemplate(dotPhotoId: number): string {
    const isCurrent: boolean = (dotPhotoId === currPhotoId);
    return /* html */`
    <button class="carousel-dot-container f-center" onclick="showPhoto(${dotPhotoId})">
        <span class="carousel-dot ${isCurrent ? 'highlight' : ''}"></span>
    </button>
    `;
}