export default function fetchPixabayAPI(query) {
  const URL = `https://pixabay.com/api/?key=33618284-b943b6a3bf9edd3f9e88f078b&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&hits=webformatURL,largeImageURL,tags,likes,views,comments,downloads`;
  return fetch(URL);
}
