import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const loadMoreBtn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-card">
            <a href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            </a>

            <div class="gallery-info">
                <div class="info-item">
                  <p class="info-title">Likes</p>
                  <p class="info-value">${likes}</p>
                </div>

                <div class="info-item">
                  <p class="info-title">Views</p>
                  <p class="info-value">${views}</p>
                </div>

                <div class="info-item">
                  <p class="info-title">Comments</p>
                  <p class="info-value">${comments}</p>
                </div>

                <div class="info-item">
                  <p class="info-title">Downloads</p>
                  <p class="info-value">${downloads}</p>
                </div>
            </div>
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
