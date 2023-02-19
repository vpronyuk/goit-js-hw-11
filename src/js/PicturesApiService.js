import axios from 'axios';
const API_KEY = '33618284-b943b6a3bf9edd3f9e88f078b';
const BASE_URL = 'https://pixabay.com/api/';
const searchParameters =
  'image_type=photo&orientation=horizontal&safesearch=true';

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
  }

  nextPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
