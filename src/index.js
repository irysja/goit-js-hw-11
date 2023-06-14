
/*<script type="module"> 
  import axios from 'axios';
  import Notiflix from 'notiflix';

  const form = document.getElementById('search-form');
  const gallery = document.getElementById('gallery');
  const API_KEY = 'YOUR_PIXABAY_API_KEY';

  form.addEventListener('submit', handleFormSubmit);

  async function handleFormSubmit(event) {
    event.preventDefault();
    const searchQuery = event.target.elements.searchQuery.value;

    if (searchQuery.trim() === '') {
      Notiflix.Notify.warning('Please enter a search query.');
      return;
    }

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          searchQuery
        )}&image_type=photo&orientation=horizontal&safesearch=true`
      );
      const images = response.data.hits;
      displayImages(images);
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure('Failed to fetch images. Please try again later.');
    }
  }

  function displayImages(images) {
    gallery.innerHTML = '';

    if (images.length === 0) {
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    images.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = image.webformatURL;
      imgElement.alt = image.tags;
      gallery.appendChild(imgElement);
    });
  }*/
