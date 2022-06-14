const LOCALSTORAGE_KEY = "example";
const exampleData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
console.log(exampleData);
const { page, results } = exampleData;
console.log(results);

const gallery = document.querySelector(".cards");

const createMovieCardMarkup = results.map((item) => {
    // console.log(item.id);
    const movieCard =
        `<li class="film-card" data-action="${item.id}">
        <div class="thumb">
           <img src="https://image.tmdb.org/t/p/w500"${item.poster_path}"" alt="${item.title}" width="100%" data-id="${item.id}"
              onerror="this.onerror=null;this.src='https://ik.imagekit.io/tc8jxffbcvf/default-movie-portrait_EmJUj9Tda5wa.jpg?tr=fo-auto,di-';" />
           <span class="card-vote_average">"${item.vote_average}"</span>
        </div>
        <h2 class="card-title">"${item.title}"</h2>
        <p class="card-text">
           <span>"${item.genres}" </span> | <span>"${item.release_date}"</span>
        </p>
    </li>`
    return movieCard
});

gallery.insertAdjacentHTML('beforeend', createMovieCardMarkup.join(''));

