import ApiService from './apiServices';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import './pagination';


let apiService = new ApiService();

  const gallery = document.querySelector('.cards');
  const searchForm = document.querySelector('#search-form');
  searchForm.addEventListener('submit',getArticlesByQuery);
  function getArticlesByQuery(event){
    event.preventDefault();
    console.log(event)
    apiService.searchQuery = event.target[0].value;
    apiService
  .getSearchArticles()
  .then(data => {
    
    renderData(data);
  })
  .catch(err => {
    console.log('error in function render');
  });
      
  const myPagination = new Pagination('pagination', options);
  
  myPagination.on('beforeMove', async e => {
   const { page } = e;
  apiService.page = page;
     apiService
  .getSearchArticles()
  .then(data => {
    
    renderData(data);
  })
  .catch(err => {
    console.log('error in function render');
  });
  });
  }
  
function showError(message = ""){
if (!message){
  message = 'enter correct data'
}
}


apiService
  .getGenreTrendMovies()
  .then(data => {
    
    renderData(data);
  })
  .catch(err => {
    console.log('error in function render');
  });


  function renderData (data){

    gallery.innerHTML = '';
    data.forEach(function(element){
        let genreStr = "";
    element.genres.forEach(function(genre){
        genreStr += genre.name+' ';
    });
        
      let item =`<li class="movie_card">
        <img src="https://image.tmdb.org/t/p/original${element.poster_path}" alt="${element.title}" loading="lazy" data-id = ${element.id} class="list__img"/>
        
        <p class="info_title">${element.original_title}
          <span class="info_genre">${genreStr} | ${element.release_date}</span> 
          </p> 
        
      </li>`;

      gallery.insertAdjacentHTML("beforeend", item);
      
    });
    
    
}


const options = {
    totalItems: 5000,
    itemsPerPage: 20,
       visiblePages: 7,
        centerAlign: false,
    page: 1,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
};
if (window.innerWidth < 768) {
    options.visiblePages = 4;
};

const pagination = new Pagination('pagination', options);
pagination.on('afterMove', e => {
  gallery.innerHTML = '';
  const { page } = e;
  apiService.page = page;
  apiService
  .getGenreTrendMovies()
    .then(data => {
    
      renderData(data)
    }).catch(err => {
    console.log('error in function render');
    })
  
});


