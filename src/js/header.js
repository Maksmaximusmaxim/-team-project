const refs = {
  homeEl: document.querySelector('.header-refs'),
  libraryEl: document.querySelector('.refs-library'),
  formEl: document.querySelector('.search-form'),
};

refs.libraryEl.addEventListener('click', onLibraryClick);

function onLibraryClick(event) {
  event.preventDefault();
  refs.homeEl.classList.remove('active');
  refs.libraryEl.classList.add('active');
  changeMarkup();
}
function changeMarkup() {
  const markup = `<ul class="list-btn">
 <li class="list-btn-item"><button type="button" class="btn">Watched</button></li>
 <li class="list-btn-item"><button type="button" class="btn">queue</button></li>`;
  refs.formEl.innerHTML = markup;
}
