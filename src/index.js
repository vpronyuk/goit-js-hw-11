// import axios from 'axios';
// import Notiflix from 'notiflix';
// import fetchPixabayAPI from './js/script';

// const form = document.getElementById('search-form');
// console.log('hello');

// form.addEventListener('submit', onSubmit);

// function onSubmit(evt) {
//   evt.preventDefault();

//   const form = evt.currentTarget;
//   const inputValue = form.elements.searchQuery.value;
//   console.log(inputValue);
//   fetchPixabayAPI(inputValue).then(data => {
//     console.log(data.json());
//   });
// }

import axios from 'axios';
import Notiflix from 'notiflix';
// document.cookie = 'cookie_name=cookie_value; SameSite=None';

const form = document.getElementById('search-form');

form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const query = form.elements.searchQuery.value.trim();

  const API_KEY = '33618284-b943b6a3bf9edd3f9e88f078b';
  const BASE_URL = 'https://pixabay.com/api/';
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=1`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.hits.length > 0) {
      const images = data.hits.map(hit => {
        return {
          webformatURL: hit.webformatURL,
          largeImageURL: hit.largeImageURL,
          alt: hit.tags,
          likes: hit.likes,
          views: hit.views,
          comments: hit.comments,
          downloads: hit.downloads,
        };
      });

      // Clear any previous search results
      const searchResults = document.getElementById('search-results');
      searchResults.innerHTML = '';

      // Create image cards and add to search results
      images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${image.webformatURL}" alt="${image.alt}">
          <div class="card-info">
            <div class="likes">${image.likes} likes</div>
            <div class="views">${image.views} views</div>
            <div class="downloads">${image.downloads} downloads</div>
          </div>
        `;
        searchResults.appendChild(card);
      });
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    console.error(error);
  }
  form.reset();
}
