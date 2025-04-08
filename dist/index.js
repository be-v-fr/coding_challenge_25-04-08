var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Photo } from "./models/photo.class.js";
import { getSlideshowTemplate, getCarouselDotTemplate } from "./templates/slideshow.js";
const CONFIG = {
    apiUrl: 'https://picsum.photos/v2/list?limit=10&page=1'
};
let photos = undefined;
let currPhotoId = 0;
window.addEventListener('DOMContentLoaded', () => init());
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield downloadPhotos();
        if (photos && photos.length > 0) {
            renderSlideshow(photos[currPhotoId]);
        }
    });
}
function downloadPhotos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const downloadResp = yield fetch(CONFIG.apiUrl);
            yield onPhotosDownload(downloadResp);
        }
        catch (err) {
            console.error(err);
        }
    });
}
function onPhotosDownload(downloadResp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const photosData = yield downloadResp.json();
            instantiatePhotos(photosData);
        }
        catch (err) {
            console.error(err);
        }
    });
}
function instantiatePhotos(photosData) {
    photos = photosData.map(pd => new Photo(pd));
}
function renderSlideshow(photo) {
    const contentEl = document.getElementById('content');
    if (contentEl) {
        contentEl.innerHTML = getSlideshowTemplate(photo);
        renderCarouselDots();
    }
}
function renderCarouselDots() {
    const dotsEl = document.getElementById('carouselDots');
    if (dotsEl) {
        dotsEl.innerHTML = '';
        photos === null || photos === void 0 ? void 0 : photos.forEach((p) => {
            const isCurrentPhoto = (p.id === currPhotoId);
            dotsEl.innerHTML += getCarouselDotTemplate(p.id, isCurrentPhoto);
        });
    }
}
function showPhoto(photoId) {
    const photoEl = document.getElementById('photo');
    if (!photoEl || !photos)
        return;
    photoId = (photoId + photos.length) % photos.length;
    currPhotoId = photoId;
    renderCarouselDots();
    photoEl.src = photos[photoId].download_url;
}
window.showPhoto = showPhoto;
function slidePhoto(dir) {
    const photoId = (dir === 'next' ? currPhotoId + 1 : currPhotoId - 1);
    showPhoto(photoId);
}
window.slidePhoto = slidePhoto;
