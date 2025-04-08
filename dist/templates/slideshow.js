export function getSlideshowTemplate(photo) {
    return /* html */ `
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
export function getCarouselDotTemplate(dotPhotoId, highlight) {
    return /* html */ `
    <button class="carousel-dot-container f-center" onclick="showPhoto(${dotPhotoId})">
        <span class="carousel-dot ${highlight ? 'highlight' : ''}"></span>
    </button>
    `;
}
