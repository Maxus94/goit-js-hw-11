import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiKey = '40858721-2ab2962236a746e97c71283b6';
const form = document.querySelector('.search-form');
const listOfPictures = document.querySelector('.gallery');
const gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
listOfPictures.innerHTML = '';
form.addEventListener('submit', submitHandler);

function submitHandler(evt) {
  evt.preventDefault();
  iziToast.destroy();
  listOfPictures.innerHTML =
    '<div class="loader-block"><div class="loader-text">Loading images, please wait...</div><span class="loader"></span></div>';
  fetch(
    `https://pixabay.com/api/?key=40858721-2ab2962236a746e97c71283b6&q=${form.elements.searchText.value.trim()}&image_type=photo&orientation=horizontal&safesearch=true,`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.show({
          message: `Sorry, there are no images matching your search query. Please try again!`,
          close: false,
          maxWidth: '422px',
          backgroundColor: 'red',
          messageColor: 'white',
          messageSize: 20,
          timeout: 0,
          position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        });
        listOfPictures.innerHTML = '';
      } else {
        listOfPictures.innerHTML = createMarkup(data.hits);
        gallerySimpleLightbox.refresh();
      }
    })
    .catch(error => {
      iziToast.show({
        title: 'Error',
        message: `Something goes wrong, please try reload page.`,
        close: false,
        backgroundColor: 'red',
        messageColor: 'white',
        messageSize: 20,
        timeout: 0,
        position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      });
      listOfPictures.innerHTML = '';
    });
  form.reset();
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) =>
        `<div class="photo-card">
        <a href="${largeImageURL}">
      <img class="item-image" src="${webformatURL}" alt="${tags}" width="400" height="240" loading="lazy" />
      </a>
      <div class="info"><p class="info-item"><b>Likes</b><br>${likes}</p>
      <p class="info-item"><b>Views</b><br>${views}</p>
      <p class="info-item"><b>Comments</b><br>${comments}</p>
      <p class="info-item"><b>Downloads</b><br>${downloads}</p></div></div>`
    )
    .join('');
}
