import ApiService from './apiServices';

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

