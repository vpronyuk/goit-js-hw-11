import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

populateTextarea();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextareaInput, 500));

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  document.querySelector('textarea').value = formData.message || '';
  document.querySelector('input').value = formData.email || '';
}
