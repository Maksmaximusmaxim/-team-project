const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `f83ab619d56ba761ff69bc866a8288d9`;
export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.total_results;
  }
  fetchTrendMovies() {
    const url = `${BASE_URL}/trending/movie/week?api_key=${KEY}&language=en-US&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        data.total_results;
        console.log(data.total_results);
         const resultsData = JSON.stringify(data.total_results);
        localStorage.setItem('totalPages-current-data', resultsData);
        console.log(resultsData);
        return data
      })
      .then(({ results }) => {
        return results;
      });
  }

  fetchSearchArticles() {
    const url = `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        data.total_results;
        console.log(data.total_results);
          const resultsData = JSON.stringify(data.total_results);
        localStorage.setItem('totalPages-current-data', resultsData);
        return data
      })
      .then(({ results }) => {
        return results;
      });
  
  }


  fetchGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${KEY}&language=en-US&page=${this.page}`;
    console.log(url);
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        data.total_results;
        console.log(data.total_results);
        return data
      })
      .then( results  => {
        return results.genres;
      });
  }

  

  getGenreTrendMovies() {
    return this.fetchTrendMovies().then(data =>{return this.formatGenreDate(data)});
  }

  getSearchArticles() {
    return this.fetchSearchArticles().then(data =>{return this.formatGenreDate(data)});
  }



  formatGenreDate(data){
    
      return this.fetchGenres().then(genresList => {
        return data.map(movie => ({
          ...movie,
          release_date: movie.release_date.split('-')[0],
          genres: movie.genre_ids
            .map(id => genresList.filter(el => el.id === id))
            .flat(),
        }));
      });
  }

}