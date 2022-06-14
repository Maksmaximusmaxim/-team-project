const refs = {
  homeEl: document.querySelector('.header-refs'),
  libraryEl: document.querySelector('.refs-library'),
  formEl: document.querySelector('.search-form'),
  headerEl: document.querySelector('header'),
};

refs.libraryEl.addEventListener('click', onLibraryClick);

function onLibraryClick(event) {
  event.preventDefault();
  refs.homeEl.classList.remove('active');
  refs.libraryEl.classList.add('active');
  changeMarkup();
  changeBackgroundImg();
}
function changeMarkup() {
  const markup = `<ul class="list-btn">
 <li class="list-btn-item"><button type="button" class="btn">Watched</button></li>
 <li class="list-btn-item"><button type="button" class="btn">queue</button></li>`;
  refs.formEl.innerHTML = markup;
}
function changeBackgroundImg() {
  refs.headerEl.classList.add('header-library');
}
