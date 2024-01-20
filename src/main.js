
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiKey = '40858721-2ab2962236a746e97c71283b6';
const form = document.querySelector('.search-form');
const listOfPictures=document.querySelector('.gallery');
const gallerySimpleLightbox = new SimpleLightbox('.gallery a');
  console.log(gallerySimpleLightbox);
  listOfPictures.innerHTML='';
form.addEventListener('submit', submitHandler);

function submitHandler(evt) {
  evt.preventDefault();
  console.log(form.elements.searchText.value);
  fetch(
    `https://pixabay.com/api/?key=40858721-2ab2962236a746e97c71283b6&q=${form.elements.searchText.value}&image_type=photo&orientation=horizontal&safesearch=true,`
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
          backgroundColor: 'red',
          messageColor: 'white',
          messageSize: 20,
          timeout: 0,
          position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        });
      }else{
        listOfPictures.innerHTML=createMarkup(data.hits);
        console.log(listOfPictures);
        gallerySimpleLightbox.refresh();
        console.log(gallerySimpleLightbox);
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
    }); 
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







// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// const form = document.querySelector('.search-form');
// const input = document.querySelector('input[name="searchText"]');
// const gallery = document.querySelector('.gallery');

// let textToSearch = '';
// let gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 50,
// });

// form.addEventListener('submit', searchButtonHandler);

// async function searchButtonHandler(event) {
//   event.preventDefault();
//   textToSearch = input.value.trim();
//   iziToast.destroy();
//   if (textToSearch === '') {
//     alert(
//       "Search form can't be empty, enter there some text for images search."
//     );
//     return;
//   } else {
//     gallery.innerHTML = '';
//     try {
//       const data = await servicePictures();
//       console.log(data.hits);
//       if (Array.from(data.hits).length === 0) {
//         iziToast.show({
//           title: 'Error',
//           message: `Sorry, there are no images matching your search query. Please try again.`,
//           close: false,
//           backgroundColor: 'red',
//           messageColor: 'white',
//           messageSize: 20,
//           timeout: 2000,
//           position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
//         });
//       } else {
//         gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
//         console.log(gallery);
//         gallerySimpleLightbox.refresh();
//         iziToast.show({
//           //title: 'Error',
//           message: `Hooray! We found ${data.totalHits} images.`,
//           close: false,
//           backgroundColor: 'green',
//           messageColor: 'white',
//           messageSize: 20,
//           timeout: 2000,
//           position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
//         });
//       }
//     } catch {
//       iziToast.show({
//         //title: 'Error',
//         message: `Something goes wrong, please try reload page.`,
//         close: false,
//         backgroundColor: 'red',
//         messageColor: 'white',
//         messageSize: 20,
//         timeout: 0,
//         position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
//       });
//     }
//   }
// }

// async function servicePictures() {
//   const pictures = await fetch(
//     `https://pixabay.com/api/?key=40858721-2ab2962236a746e97c71283b6&q=${form.elements.searchText.value}&image_type=photo&orientation=horizontal$safesearch=true`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .catch(error => {
//       console.log(error);
//     });  
//   return pictures;
// }

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({
//         webformatURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//         largeImageURL,
//       }) =>
//         `<div class="photo-card">
//         <a class="gallery__link" href="${largeImageURL}">
//       <img class="item-image" src="${webformatURL}" alt="${tags}" width="400" height="240" loading="lazy" />
//       </a>
//       <div class="info"><p class="info-item"><b>Likes</b><br>${likes}</p>
//       <p class="info-item"><b>Views</b><br>${views}</p>
//       <p class="info-item"><b>Comments</b><br>${comments}</p>
//       <p class="info-item"><b>Downloads</b><br>${downloads}</p></div></div>`
//     )
//     .join('');
// }
