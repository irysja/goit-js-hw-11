import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreButton = document.querySelector('.load-more');
const API_KEY = '37280539-cd6db321c9edd6308828ea5a9';
let currentPage = 1;
let lightbox;
let totalHits = 0;

form.addEventListener('submit', handleFormSubmit);
loadMoreButton.addEventListener('click', handleLoadMore);

async function handleFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.warning('Please enter a search query.');
    return;
  }

  loadMoreButton.style.display = 'none';
  currentPage = 1;
  gallery.innerHTML = '';

  try {
    const { images, total } = await fetchImages(searchQuery);
    totalHits = total;
    displayImages(images);
    loadMoreButton.style.display = images.length === 40 ? 'block' : 'none';
    initializeLightbox();
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Failed to fetch images. Please try again later.');
  }
}

async function handleLoadMore() {
  const searchQuery = form.elements.searchQuery.value.trim();

  try {
    currentPage++;
    const { images } = await fetchImages(searchQuery);
    displayImages(images);
    loadMoreButton.style.display = currentPage * 40 >= totalHits ? 'none' : 'block';
    initializeLightbox();
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Failed to fetch images. Please try again later.');
  }
}

async function fetchImages(searchQuery) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    searchQuery
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;
  const response = await axios.get(url);
  const { hits, totalHits } = response.data;
  return { images: hits, total: totalHits };
}

function displayImages(images) {
  if (images.length === 0) {
    Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  const fragment = document.createDocumentFragment();

  const imageElements = images.map((image) => {
    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');

    const imgLink = document.createElement('a');
    imgLink.href = image.largeImageURL;
    imgLink.classList.add('gallery-link');

    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    imgElement.loading = 'lazy';

    const info = document.createElement('div');
    info.classList.add('info');

    const likes = createInfoItem('Likes', image.likes);
    const views = createInfoItem('Views', image.views);
    const comments = createInfoItem('Comments', image.comments);
    const downloads = createInfoItem('Downloads', image.downloads);

    info.append(likes, views, comments, downloads);
    imgLink.appendChild(imgElement);
    photoCard.append(imgLink, info);
    
    return photoCard;
  });

  fragment.append(...imageElements);
  gallery.appendChild(fragment);

  if (currentPage * 40 >= totalHits) {
    loadMoreButton.style.display = 'none';
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

function createInfoItem(label, value) {
  const infoItem = document.createElement('p');
  infoItem.classList.add('info-item');
  const labelElement = document.createElement('b');
  labelElement.textContent = label;
  infoItem.append(labelElement, `: ${value}`);
  return infoItem;
}

function initializeLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery-link');
  }
}
