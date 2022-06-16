import 'basiclightbox/src/styles/main.scss';
import * as basicLightbox from 'basiclightbox';
import spiner from './spiner';


const BASE_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY = 'f83ab619d56ba761ff69bc866a8288d9';

const slide = document.querySelector('.slider-container');

slide.addEventListener('click', onSlideClick);

function onSlideClick(e) {
    e.preventDefault();
    const id = e.target.dataset.id;   
    const url = `${BASE_URL}/${id}/videos?api_key=${API_KEY}&language=en-US`
    spiner.spiner.show();
    fetch(url)
        .then(response => response.json())        
        .then((r) => {            
            const key = r.results[0].key;            
            const trailer = basicLightbox.create(`
                 <iframe width="560" height="315" src='https://www.youtube.com/embed/${key}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
            trailer.show();
            closeBtnTrailer(trailer);
            spiner.spiner.close();
      });
};

function closeBtnTrailer(trailer) {
    const modalBox = document.querySelector('.basicLightbox--iframe');
    modalBox.insertAdjacentHTML(
      'afterbegin',
      `<button
        type="button"
        class="lightbox__button"
        data-action="close-lightbox"
        ></button>
    `,
    );
    const modalCloseBtn = document.querySelector(
      '[data-action="close-lightbox"]',
    );
    modalCloseBtn.addEventListener('click', () => trailer.close());
  }
    

