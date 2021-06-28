import { API_KEY } from './apikey.js';

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const select = document.getElementById('category');

const body = document.querySelector('body');
let imageDiv = document.querySelector('.image-div');
let closeButton = document.querySelector('#close');
let images = [];
let ready = false;
let category = 'nature';
let photosLoaded = 0;
let totalImages = 0;
let imageParent;
let imagesData = [];

// Unsplash API
const count = 30;
const apiKey = API_KEY;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=${category}`;

function loadedImageCount() {
  photosLoaded++;
  if (photosLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributesOfElements(element, args) {
  for (const key in args) element.setAttribute(key, args[key]);
}

function displayPhotos(imagesData) {
  images = [];
  totalImages = imagesData.length;
  imagesData.forEach(function (image) {
    const figure = document.createElement('figure');
    setAttributesOfElements(figure, { class: 'gallery-thumb' });
    const img = document.createElement('img');
    setAttributesOfElements(img, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.alt_description,
    });

    img.addEventListener('load', loadedImageCount);

    // Appending the image to the image container.
    figure.appendChild(img);
    images.push(img);
    imageContainer.appendChild(figure);
  });
}

// Checking if we have reached the bottom of the screen.
window.addEventListener('scroll', function () {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    photosLoaded = 0;
    getImagesFromUnsplash(apiUrl);
  }
});

// Fetches the image from other category based on the selected option
function fetchImageFromOtherCategory(e) {
  category = e.target.value;
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=${category}`;
  imageContainer.innerHTML = '';
  ready = false;
  photosLoaded = 0;
  loader.hidden = false;
  getImagesFromUnsplash(apiUrl);
}

function showClickedImage(e) {
  const image = e.target;
  imageParent = e.target.parentNode;

  // Creating a 'div' element to embed image
  imageDiv = document.createElement('div');
  imageDiv.setAttribute('class', 'image-div');

  // Create a 'close-button' for closing the image
  closeButton = document.createElement('i');
  closeButton.setAttribute('class', 'fas fa-times');
  closeButton.setAttribute('id', 'close');

  // Adding img and close-button to the div
  imageDiv.appendChild(closeButton);
  imageDiv.appendChild(image);

  body.appendChild(imageDiv);
  imageContainer.classList.add('blur-image-container');
  closeButton.addEventListener('click', hideClickedImage);
}

// Hides the div when the 'close-button' is clicked.
// First we need to remove all the child from the parent and then remove the parent.
function hideClickedImage(e) {
  const image = closeButton.nextSibling;
  imageDiv.removeChild(closeButton.nextSibling);

  imageDiv.removeChild(closeButton);
  imageParent.appendChild(image);
  body.removeChild(imageDiv);

  imageContainer.classList.remove('blur-image-container');
}

async function getImagesFromUnsplash(apiUrl) {
  imagesData = [];
  try {
    const response = await fetch(apiUrl);
    const imagesData = await response.json();
    displayPhotos(imagesData);

    images.forEach(function (img) {
      img.addEventListener('click', showClickedImage);
    });
  } catch (error) {
    alert(error);
  }
}

// Event Listeners
select.addEventListener('change', fetchImageFromOtherCategory);

// On load
getImagesFromUnsplash(apiUrl);
