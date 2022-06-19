import LocalStorageAPI from './localStorageAPI';
import Pagination  from 'tui-pagination';
import './pagination';

const KEY = `f83ab619d56ba761ff69bc866a8288d9`;
  

const refs = {
  homeEl: document.querySelector('.header-refs'),
  libraryEl: document.querySelector('.refs-library'),
  formEl: document.querySelector('.search-form'),
  headerEl: document.querySelector('header'),
};

const galleryEl = document.querySelector('.cards');

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

  watchedLibrEl.addEventListener('click', async () => {
    const librKey = 'Watched';
    const watchedMoviesIds = LocalStorageAPI.getMovies(librKey); //отримуємо масив ІД

    galleryEl.innerHTML = '';

    if (watchedMoviesIds.length === 0) {
      galleryEl.innerHTML =
        'Sorry, there are no movies in your WATCHED collection';
      return;
    } else {
      const films = await fetchFilms(watchedMoviesIds); // отримуємо масив об'єктів фільмів по ІД
      renderData(films); // рендеримо розмітку
    }
  });

  queueLibrEl.addEventListener('click', async () => {
    const librKey = 'Queue';
    const queueMoviesIds = LocalStorageAPI.getMovies(librKey);

    galleryEl.innerHTML = '';

    if (queueMoviesIds.length === 0) {
      galleryEl.innerHTML =
        'Sorry, there are no movies in your QUEUE collection';
      return;
    } else {
      const films = await fetchFilms(queueMoviesIds); // отримуємо масив об'єктів фільмів по ІД
      renderData(films); // рендеримо розмітку
    }
  });

  watchedLibrEl.focus();
  watchedLibrEl.click();
}

function changeBackgroundImg() {
  refs.headerEl.classList.add('header-library');
}

async function fetchFilms(ids) {
  const arrayOfPromises = ids.map(async filmId => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${filmId}?api_key=${KEY}&language=en-US`
    );
    return response.json();
  });

  const films = await Promise.all(arrayOfPromises);
  return films;
}

function renderData(data) {
  data.forEach(function (element) {
    let genreStr = '';
    element.genres.forEach(function (genre) {
      genreStr += genre.name + ' ';
    });

    let item = `<li class="movie_card">
      <img src="https://image.tmdb.org/t/p/original${element.poster_path}" alt="${element.title}" loading="lazy" class='list__img' data-id = '${element.id}'/>
      
      <p class="info_title">${element.original_title}
        <span class="info_genre">${genreStr} | ${element.release_date}</span> 
        </p> 
      
    </li>`;

    galleryEl.insertAdjacentHTML('beforeend', item);
  });
}
