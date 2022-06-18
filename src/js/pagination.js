import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import './apiServices';
import ApiService from './apiServices';
const apiService = new ApiService();
// console.log(apiService);


    const pagination = new Pagination('pagination', {
  totalItems: 5000,
  itemsPerPage: 1,
  visiblePages: 7,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}" >' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
    });

 pagination.on('afterMove', e => {
            const { page } = e;
            apiService.page = page;
            const dataMoviesPopular = apiService.fetchTrendMovies(); // данные из API по запросу "популярные фильмы" (объект - { page: 1, results: (20) […], total_pages: 33054, total_results: 661074 })
            const dataGenres = apiService.fetchGenres(); // массив объектов [{ id: 28, name: "Action" } ..... { id: 76, name: "Horor" }]
           
            // console.log(dataMoviesPop);
            // console.log(dataGenresList);
            // console.log(dataGenres);
        
       
 });
        