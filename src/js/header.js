const refs = {
  homeEl: document.querySelector('.header-refs'),
  libraryEl: document.querySelector('.refs-library'),
  formEl: document.querySelector('.search-form'),
  headerEl: document.querySelector('header'),
};
import LocalStorageAPI from './localStorageAPI';
refs.libraryEl.addEventListener('click', onLibraryClick);

function onLibraryClick(event) {
  event.preventDefault();
  refs.homeEl.classList.remove('active');
  refs.libraryEl.classList.add('active');
  changeMarkup();
  changeBackgroundImg();
}

function changeMarkup() {
  const markup = `<ul class="list-btn">
 <li class="list-btn-item"><button type="button" class="btn" id="watchedLibr">Watched</button></li>
 <li class="list-btn-item"><button type="button" class="btn" id="queueLibr">queue</button></li>`;
  refs.formEl.innerHTML = markup;

  const watchedLibrEl = document.querySelector('#watchedLibr');
  const queueLibrEl = document.querySelector('#queueLibr');

  watchedLibrEl.addEventListener('click', onWatchedBtnClick);
  queueLibrEl.addEventListener('click', onQueueBtnClick);

  watchedLibrEl.focus();
  watchedLibrEl.click();
}

function changeBackgroundImg() {
  refs.headerEl.classList.add('header-library');
}

const galleryEl = document.querySelector('.cards');

function onWatchedBtnClick() {
  const librKey = 'Watched';

  const watchedMovies = LocalStorageAPI.getMovies(librKey);

  galleryEl.innerHTML = '';

  if (watchedMovies.length === 0) {
    galleryEl.innerHTML =
      'Sorry, there are no movies in your WATCHED collection';
  } else {
    renderData(watchedMovies);
  }
}

function onQueueBtnClick() {
  const librKey = 'Queue';

  const queueMovies = LocalStorageAPI.getMovies(librKey);
  const galleryEl = document.querySelector('.cards');

  galleryEl.innerHTML = '';

  if (queueMovies.length === 0) {
    galleryEl.innerHTML = 'Sorry, there are no movies in your QUEUE collection';
  } else {
    renderData(queueMovies);
  }
}

function renderData(data) {
  data.forEach(function (element) {
    let genreStr = '';
    element.genres.forEach(function (genre) {
      genreStr += genre.name + ' ';
    });

    let item = `<li class="movie_card">
      <img src="https://image.tmdb.org/t/p/original${element.poster_path}" alt="${element.title}" loading="lazy" class='list__img' />
      
      <p class="info_title">${element.original_title}
        <span class="info_genre">${genreStr} | ${element.release_date}</span> 
        </p> 
      
    </li>`;

    galleryEl.insertAdjacentHTML('beforeend', item);
  });
}
