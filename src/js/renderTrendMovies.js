import ApiService from './apiServices';

let apiService = new ApiService();

  const gallery = document.querySelector('.cards');
apiService
  .getGenreTrendMovies()
  .then(data => {
    console.log(data);
    renderData(data);
  })
  .catch(err => {
    console.log('error in function render');
  });

  function renderData (data){
    data.forEach(function(element){
        let genreStr = "";
    element.genres.forEach(function(genre){
        genreStr += genre.name+' ';
    });
        
      let item =`<div class="movie_cards">
        <img src="https://image.tmdb.org/t/p/original${element.poster_path}" alt="" loading="lazy" class='list__element' />
        <div class="info">
        <p class="info_title">
            ${element.original_title}
          </p>
          <p class="info_genre">
            ${genreStr} </span> | <span> ${element.release_date}
          </p>
          
        </div>
      </div>`;
      gallery.insertAdjacentHTML("beforeend", item);
    });
    
    
}