import axios from 'axios';
import Notiflix from 'notiflix';
import fetchPixabayAPI from './js/script';

const form = document.getElementById('search-form');
console.log('hello');

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const inputValue = form.elements.searchQuery.value;
  console.log(inputValue);
  fetchPixabayAPI(inputValue).then(data => {
    console.log(data.json());
  });
}
