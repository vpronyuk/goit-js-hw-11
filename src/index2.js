// import axios from 'axios';
import Notiflix from 'notiflix';
import PicturesApiService from './js/PicturesApiService';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './components/LoadMoreBtn.js';

const form = document.getElementById('search-form');
const picturesWrapper = document.querySelector('.gallery');

const picturesApiService = new PicturesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

const gallery = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

loadMoreBtn.button.addEventListener('click', fetchHits);

// Listener for search button click
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const inputQuery = form.elements.searchQuery.value.trim();

  picturesApiService.searchQuery = inputQuery;

  picturesApiService.resetPage();
  clearPictures();
  loadMoreBtn.show();
  fetchHits().finally(() => form.reset());
}

async function fetchHits() {
  loadMoreBtn.disable();

  try {
    const hits = await picturesApiService.getPixabayPictures();

    if (hits.length === 0)
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

    // throw new Error('No data!!');
    const markup = hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
    appendPictures(markup);
    loadMoreBtn.enable();
  } catch (error) {
    console.error(error);
    // loadMoreBtn.hide();
  }
  gallery.refresh();
  console.log(picturesApiService);
}

function appendPictures(markup) {
  picturesWrapper.insertAdjacentHTML('beforeend', markup);
}

function clearPictures() {
  picturesWrapper.innerHTML = '';
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  <div class = "photo-card">
    <a href="${largeImageURL}"> 
      <img
      src="${webformatURL}"
      alt="${tags}" 
      loading="lazy"
      />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}</p>
      <p class="info-item">
        <b>Views</b>${views}</p>
      <p class="info-item">
        <b>Comments</b>${comments}</p>
      <p class="info-item">
        <b>Downloads</b>${downloads}</p>
    </div>
  </div>`;
}
