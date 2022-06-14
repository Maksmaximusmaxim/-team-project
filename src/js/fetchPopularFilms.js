// import './partials/gallery.html';
const popularUrl = fetch (`https://api.themoviedb.org/3/trending/movie/week?api_key=f83ab619d56ba761ff69bc866a8288d9&language=en-US`)
.then((response) => {
    return response.json();
  })
  .then((data) => {
    
    renderData (data);
  });

  const gallery = document.querySelector('.cards');
  
  

  function renderData (data){
    console.log(data);
    data.results.forEach(function(element){
    
        
      let item =`<div class="movie_cards">
        <img src="https://image.tmdb.org/t/p/original${element.poster_path}" alt="" loading="lazy" class='list__element' />
        <div class="info">
        <p class="info_title">
            ${element.original_title}
          </p>
          <p class="info_genre">
            Жанр ${element.genre_ids} Дата ${element.release_date}
          </p>
          
        </div>
      </div>`;
      gallery.insertAdjacentHTML("beforeend", item);
    });
    
    
}