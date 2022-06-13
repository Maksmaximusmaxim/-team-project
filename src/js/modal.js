
// Основні змінні

const open = document.querySelector('[data-action="open-modal"]'),
   close = document.querySelector('[data-action="close-modal"]'),
   backdrop = document.querySelector('.js-backdrop');

// Слухачі   

open.addEventListener('click', onOpen);
close.addEventListener('click', onClose);
backdrop.addEventListener('click', onBackdrop);
window.addEventListener('keydown', onEsc);


// Функція відкриття модалки
function onOpen() {
   document.body.classList.add('show-modal');
}

// Функція закриття модалки
function onClose() {
   document.body.classList.remove('show-modal');  
}

// Функція закриття модалки по кліку в Backdrop 
function onBackdrop(e) {
   if(e.currentTarget === e.target) {
      onClose(); 
   }
}

// Функція закриття модалки по Escape  
function onEsc(e) {
const escKey = 'Escape',
isEscKey = e.code === escKey;
if(isEscKey) {
onClose();   
}
}
