const refs = {
  homeEl: document.querySelector('.header-refs'),
  libraryEl: document.querySelector('.refs-library'),
};

refs.libraryEl.addEventListener('click', onLibraryClick);

function onLibraryClick(event) {
  event.preventDefault();
  refs.homeEl.classList.remove('active');
  refs.libraryEl.classList.add('active');
}
