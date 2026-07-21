import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;
const PER_PAGE = 15;

const onSearchFormSubmit = async event => {
  console.log('FORM SUBMIT FIRED');
  event.preventDefault();

  query = form.elements['search-text'].value.trim();

  console.log(query);

  if (!query) {
    hideLoadMoreButton();

    iziToast.error({
      message: 'Please enter a search query',
      position: 'topRight',
    });

    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }

    createGallery(data.hits);

    const maxPages = Math.ceil(totalHits / PER_PAGE);
    if (page < maxPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    // const card = document.querySelector(".gallery-card");
    // const height = card.getBoundingClientRect().height;
    // window.scrollBy({
    //     top: height * 2,
    //     behavior: "smooth",
    // });

    // iziToast.success({
    //     message: `Hooray! Found ${data.hits.length} images`,
    //     position: "topRight",
    // });
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
};

const onLoadMoreClick = async () => {
  page += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    const card = document.querySelector('.gallery-card');

    if (card) {
      const cardHeight = card.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    const maxPages = Math.ceil(totalHits / PER_PAGE);

    if (page < maxPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (err) {
    iziToast.error({
      message: 'Error loading more images',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

form.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);
