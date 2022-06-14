import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

export function makePagination() {
    const pagination = new Pagination('pagination', {
        totalItems: 5000,
        itemsPerPage: 10,
        visiblePages: 5,
        page: 1,
        usageStatistics: false,
        template: {
            page: `<a href="#" class="tui-page-btn">${this.page}</a>`,
            currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
            moveButton:
                '<a href="#" class="tui-page-btn tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</a>',
            disabledMoveButton:
                '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</span>',
            moreButton:
                '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                '<span class="tui-ico-ellip">...</span>' +
                '</a>',
        },
    });


    // pagination.on('beforeMove', async evt => {
    //     const currentPage = (fetchTrending.page = evt.page);
    //     const movies = await fetchTrending(currentPage).then(movie => {
    //       const results = movie.results;
    //       const standardizedResults = results.map(result => standardizeDataFromAPI(result));
    //       const movieCard = standardizedResults.map(result => renderCardMovie(result));
    //       refs.moviesContainerRef.innerHTML = '';
    //       refs.moviesContainerRef.append(...movieCard);
    //     });
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    //     Loading.hourglass('Loading...', {
    //       svgColor: '#FF6B08',
    //     });
    //     Loading.remove(800);
    //   });
    // 
}