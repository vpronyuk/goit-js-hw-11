import axios from 'axios';
// import Notiflix from 'notiflix';
const API_KEY = '33618284-b943b6a3bf9edd3f9e88f078b';
const BASE_URL = 'https://pixabay.com/api/';
const searchParameters =
  'image_type=photo&orientation=horizontal&safesearch=true';

// export default class PicturesApiService {
//   constructor() {
//     this.page = 1;
//     this.searchQuery = '';
//   }
// export default async function getPixabayPictures(query) {
//   const url = `${BASE_URL}?key=${API_KEY}&q=${query}&${searchParameters}&page=1&per_page=40`;
//   return await fetch(url).then(response => response.json());

// if (!response.ok) {
//   Notiflix.Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again.'
//   );
// }
// const pictures = await response.json();
// return pictures;
// }

export default class PicturesApiService {
  constructor() {
    this.page = 1;
    this.per_page = 40;
    this.searchQuery = '';
  }

  async getPixabayPictures() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${searchParameters}&page=${this.page}&per_page=${this.per_page}`;

    const response = await axios.get(url);
    this.nextPage();
    return response.data.hits;
    // return await fetch(url)
    //   .then(response => response.json())
    //   .then(({ hits }) => {
    //     this.nextPage();
    //     return hits;
    //   });

    // return axios.get(url).then(({ hits }) => {
    //   this.nextPage();
    //   return hits;
    // });
  }

  nextPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
