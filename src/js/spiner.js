import * as basicLightbox from 'basiclightbox'

const spinerMarkup = `<div class = "spiner_block">
<span class="loader"></span>
</div>`;

const spiner = basicLightbox.create(spinerMarkup);



export default { spiner };

//  импортируем спинер себе в js файл ;
// ПОКАЗАТЬ спиннер - spiner.show();
// ЗАКРЫТЬ  спиннер - spiner.close();

