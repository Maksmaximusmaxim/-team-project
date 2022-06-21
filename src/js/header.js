import LocalStorageAPI from './localStorageAPI';
import makePagination from './pagination';
import renderData from './renderData';
import * as renderTrend from './renderTrendMovies';

const KEY = `f83ab619d56ba761ff69bc866a8288d9`;
  


const refs = {
  homeEl: document.querySelector('.header-refs'),
  libraryEl: document.querySelector('.refs-library'),
  formEl: document.querySelector('.search-form'),
  headerEl: document.querySelector('header'),
};

const galleryEl = document.querySelector('.cards');

refs.libraryEl.addEventListener('click', onLibraryClick);
refs.homeEl.addEventListener('click', onHomeClick);

function onHomeClick(event) {
  event.preventDefault();
  refs.homeEl.classList.add('active');
  refs.libraryEl.classList.remove('active');
  changeMarkupHome();
  changeBackgroundImgHome();
  renderTrend.apiService.page = 1;
  renderTrend.renderTrendMovies();
}

function onLibraryClick(event) {
  event.preventDefault();
  refs.homeEl.classList.remove('active');
  refs.libraryEl.classList.add('active');
  changeMarkup();
  changeBackgroundImg();
}

function changeMarkupHome() {
  const markup = `<form class="search-form" id="search-form">
            <input class="search" type="text" name="searchQuery" autocomplete="off" placeholder="Search movies" />
            <button class="btn-search" type="submit">
                
            </button>
        </form>`;
  refs.formEl.innerHTML = markup;  
}

function changeMarkup() {
  const markup = `<ul class="list-btn">
 <li class="list-btn-item"><button type="button" class="btn" id="watchedLibr">Watched</button></li>
 <li class="list-btn-item"><button type="button" class="btn" id="queueLibr">queue</button></li>`;
  refs.formEl.innerHTML = markup;

  
  const watchedLibrEl = document.querySelector('#watchedLibr');
  const queueLibrEl = document.querySelector('#queueLibr');

  watchedLibrEl.addEventListener('click', async () => {
  queueLibrEl.classList.remove('btn_isActive');
  watchedLibrEl.classList.add('btn_isActive');

    const librKey = 'Watched';
    
    
    const watchedMoviesIds = LocalStorageAPI.getMovies(librKey); //отримуємо масив ІД

    galleryEl.innerHTML = '';

    if (watchedMoviesIds.length === 0) {      
      galleryEl.innerHTML =
        'Sorry, there are no movies in your WATCHED collection';
      return;
    } else { 
      let page = 1;
      let onPage = 20;
      let start = (page - 1) * onPage;
      let end = start + onPage;
      let cards = watchedMoviesIds.slice(start, end);
      renderDataByArray(cards);   // рендеримо розмітку      
      makePagination(watchedMoviesIds.length, page,'myLibrary', watchedMoviesIds);      
    }
  });

    queueLibrEl.addEventListener('click', async () => {
    watchedLibrEl.classList.remove('btn_isActive');
    queueLibrEl.classList.add('btn_isActive');

    const librKey = 'Queue';
    const queueMoviesIds = LocalStorageAPI.getMovies(librKey);

    galleryEl.innerHTML = '';
      let page = 1;
      let onPage = 20;
      let start = (page - 1) * onPage;
      let end = start + onPage;
      let cards = queueMoviesIds.slice(start, end);
      renderDataByArray(cards);      
      makePagination(queueMoviesIds.length, page,'myLibrary', queueMoviesIds);    
  });
  watchedLibrEl.focus();
  watchedLibrEl.click();
  watchedLibrEl.classList.add('btn_isActive');
}

export async function renderDataByArray(array) {
  if (array.length === 0) {    
    galleryEl.innerHTML =
      'Sorry, there are no movies in your QUEUE collection';
    return;
  } else {     
    const films = await fetchFilms(array);
    renderData(films);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function changeBackgroundImgHome() {
  refs.headerEl.classList.remove('header-library');
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






