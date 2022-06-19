import ApiService from './apiServices';
import * as basicLightbox from 'basiclightbox';
import LocalStorageAPI from './localStorageAPI';

let apiService = new ApiService();
const KEY = `f83ab619d56ba761ff69bc866a8288d9`;
let instance = '';

const a = document.querySelector('.cards');

a.addEventListener('click', onFilmClick);

function onFilmClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const filmId = event.target.dataset?.id;
  if (filmId) {
    fetchFilm(filmId);
  }
}

function fetchFilm(filmId) {
  fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?api_key=${KEY}&language=en-US`
  )
    .then(response => response.json())
    .then(film => {
      let genreStr = '';
      film.genres.forEach(function (genre) {
        genreStr += genre.name + ' ';
      });

      instance = basicLightbox.create(`  
       <div class = "backdrop-modal "> 
          <div class="modal-card">  
       
            <div class="modal-film__img">  
              <img class = "image" src="https://image.tmdb.org/t/p/original${film.poster_path}" alt="${film.title}">  
          </div>  
          <div class="modal-film__info">  
              <h2 class="modal-film__title">${film.original_title}</h2>  
              <p class= "modal-film__votes modal-film__text"> Vote / Votes <span class="votes_average"> ${film.vote_average}</span>/<span class ="votes_count">${film.vote_count}</span> </p>  
              <p class= "modal-film__popularity modal-film__text">Popularity <span class="popularity"> ${film.popularity} </span></p>  
              <p class= "modal-film__original-title modal-film__text">Original Title <span class="original_title">${film.original_title} </span> </p>  
              <div class = "genres">  
                <p class = "modal-film__genres modal-film__text">Genre </p>  
                <p class="modal-film__genres-names">  
              <span class = "modal-film__genres-item">${genreStr} </span> 
               
              </p>  
          </div>  
  
                  <p class="modal-film__about"> ABOUT </p>  
                  <p class="modal-film__description"> ${film.overview} </p>  
  
     
      <div class = "modal-film__buttons"> 
          <ul class= "modal-film__list-button">  
              <li>  
                  <button type="button" class = "btn_add__watched">Add to watched</button>  
              </li>  
              <li>  
                  <button type="button" class = "btn_add__queue">Add to queue</button>  
              </li>  
          </ul>  
          <button class="modal-film__close" data action = "modal-close"> 
          <svg width = '11' height = '11'  > 
                  <use href ="./images/close_modal_card.svg/#close-card"></use> 
                </svg></button>  
  
 </div> 
    </div>  
</div> 
    `);

      instance.show();

      window.addEventListener('keydown', onEscKeyPress);

      //Робота з кнопками

      //Кнопки
      const addToWatchedBtn = document.querySelector('.btn_add__watched');
      const addToQueueBtn = document.querySelector('.btn_add__queue');

      checkFilmStatus(film);

      //Слухачі
      addToWatchedBtn.addEventListener('click', onWatchedBtnClick);
      addToQueueBtn.addEventListener('click', onQueueBtnClick);

      //Функція перевірки присутності фільму у локальному сховищі
      function checkFilmStatus(film) {
        const idValue = film.id;
        const watchedArr = LocalStorageAPI.getMovies('Watched');
        const queueArr = LocalStorageAPI.getMovies('Queue');

        if (watchedArr.includes(film.id)) {
          addToWatchedBtn.textContent = 'Remove from Watched';
          addToQueueBtn.disabled = true;
        }

        if (queueArr.includes(film.id)) {
          addToQueueBtn.textContent = 'Remove from Queue';
          addToWatchedBtn.disabled = true;
        }
      }

      function onWatchedBtnClick(e) {
        const addContent = 'Add to watched';
        const removeContent = 'Remove from Watched';

        if (e.target.textContent === addContent) {
          LocalStorageAPI.setMovie('Watched', film.id);
          e.target.textContent = removeContent;
          addToQueueBtn.disabled = true;
        } else {
          LocalStorageAPI.removeMovie('Watched', film.id);
          e.target.textContent = addContent;
          addToQueueBtn.disabled = false;
        }

        //КОСТИЛЬ - якщо фільм видаляється з бібліотеки, коли користувач знаходиться у бібліотеці -
        // для нвого рендеру відбувається примусовий клік по кнопці вілповідної бібліотеки
        if (
          document.querySelector('.refs-library').classList.contains('active')
        ) {
          a.innerHTML = '';
          document.querySelector('#watchedLibr').click();
        }
      }

      function onQueueBtnClick(e) {
        const addContent = 'Add to queue';
        const removeContent = 'Remove from Queue';

        if (e.target.textContent === addContent) {
          LocalStorageAPI.setMovie('Queue', film.id);
          e.target.textContent = removeContent;
          addToWatchedBtn.disabled = true;
        } else {
          LocalStorageAPI.removeMovie('Queue', film.id);
          e.target.textContent = addContent;
          addToWatchedBtn.disabled = false;
        }

        //КОСТИЛЬ (див. вище)
        if (
          document.querySelector('.refs-library').classList.contains('active')
        ) {
          a.innerHTML = '';
          document.querySelector('#queueLibr').click();
        }
      }
    });
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  instance.close();
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
