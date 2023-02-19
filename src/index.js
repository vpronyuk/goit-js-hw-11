import axios from 'axios';
import Notiflix from 'notiflix';
import getPixabayPictures from './js/PicturesApiService';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');

form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const query = form.elements.searchQuery.value.trim();

  // ===========================
  // getPixabayPictures(query).then(({ hits }) => {
  //   if (hits.length === 0) throw new Error('No data');

  //   return hits.reduce((markup, hit) => createMarkup(hit) + markup, "");
  // }).then((markup) => { console.log(markup); })
  //   .catch(onError)
  //   .finally(() => form.reset());

  // function createMarkup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  //   return `
  //   <div class="picture-card">
  //     <img src="${webformatURL}" alt="${alt}">
  //     <div class="card-info">
  //     <div class="likes">${likes} likes</div>
  //     <div class="views">${views} views</div>
  //     <div class="downloads">${downloads} downloads</div>
  //   </div>`
  // }

  // =========================
  try {
    const response = await getPixabayPictures(query);
    const data = response.data;
    // if (data.hits.length === 0) throw new Error('No data!!');
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

      picturesWrapper.innerHTML = '';

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
        picturesWrapper.appendChild(card);
      });
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    form.reset();
  }
  // const lightbox = new SimpleLightbox('picturesWrapper');
}
