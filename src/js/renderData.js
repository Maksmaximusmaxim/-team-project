const gallery = document.querySelector('.cards');

export default function renderData(data) { 
   document.querySelector('#pagination').classList.remove('visually-hidden');
  console.log(data);
  gallery.innerHTML = '';
  return data.forEach(function (element) {
    let genreStr = "";

    if (element.genres.length === 0) {
      let item = `<li class="movie_card">
        <img src="https://image.tmdb.org/t/p/original${element.poster_path}" onerror="this.onerror=null;this.src='https://dummyimage.com/600x400/000/fff&text=Filmoteka';" alt="${element.title}" loading="lazy" data-id = ${element.id} class="list__img"/>
        
        <p class="info_title">${element.original_title}
          <span class="info_genre"> ${element.release_date}</span> 
          </p> 
        
      </li>`;
  gallery.insertAdjacentHTML("beforeend", item);
    } else {
      if (element.genres.length > 2) {
        
          let genrList = element.genres[0].name + '  '+ element.genres[1].name ;
          genreStr = genrList + ' Others';
        
      } else {
       element.genres.forEach(function (genre) {
      genreStr += genre.name + '  ';
    }); 
      }
      
 let item = `<li class="movie_card">
        <img src="https://image.tmdb.org/t/p/original${element.poster_path}" onerror="this.onerror=null;this.src='https://dummyimage.com/600x400/000/fff&text=Filmoteka';" alt="${element.title}" loading="lazy" data-id = ${element.id} class="list__img"/>
        
        <p class="info_title">${element.original_title}
          <span class="info_genre">${genreStr} | ${element.release_date}</span> 
          </p> 
        
      </li>`;
  gallery.insertAdjacentHTML("beforeend", item);
    }
   
      
  });
};
