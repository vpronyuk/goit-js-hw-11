import axios from 'axios';
import Notiflix from 'notiflix';
import PicturesApiService from './js/PicturesApiService';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './components/LoadMoreBtn.js';

const form = document.getElementById('search-form');
const picturesWrapper = document.getElementById('picturesWrapper');
// const loadMoreBtn = document.querySelector('.load-more');

const picturesApiService = new PicturesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more', // перевірити чи тягне так клас.. якщо що додати id
  isHidden: true,
});

// Listener for search button click
form.addEventListener('submit', onFormSubmit);
loadMoreBtn.button.addEventListener('click', fetchHits);

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

function fetchHits() {
  loadMoreBtn.disable();
  return picturesApiService
    .getPixabayPictures()
    .then(hits => {
      if (hits.length === 0) throw new Error('No data!!');
      console.log(hits);
      console.log(picturesApiService);

      return hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
    })
    .then(markup => {
      appendPictures(markup);
      loadMoreBtn.enable();
    })
    .catch(onError);
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
  <div class = picture-card>
   
    <img alt="${tags}" class="hit-image" 
    src="${webformatURL}"
    data-source="${largeImageURL}"/>

    <div class="card-info">
    <p class="info-item">
      <b>Likes: </b>${likes}</p>
    <p class="info-item">
      <b>Views: </b>${views}</p>
    <p class="info-item">
      <b>Comments: </b>${comments}</p>
    <p class="info-item">
      <b>Downloads: </b>${downloads}</p>
    
  </div>`;
}

function onError(error) {
  console.error(error);
}
