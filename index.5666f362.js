const e=document.querySelector('[data-action="open-modal"]'),t=document.querySelector('[data-action="close-modal"]'),c=document.querySelector(".js-backdrop");function o(){document.body.classList.remove("show-modal")}e.addEventListener("click",(function(){document.body.classList.add("show-modal")})),t.addEventListener("click",o),c.addEventListener("click",(function(e){e.currentTarget===e.target&&o()})),window.addEventListener("keydown",(function(e){"Escape"===e.code&&o()}));const n={homeEl:document.querySelector(".header-refs"),libraryEl:document.querySelector(".refs-library")};n.libraryEl.addEventListener("click",(function(e){e.preventDefault(),n.homeEl.classList.remove("active"),n.libraryEl.classList.add("active")}));
//# sourceMappingURL=index.5666f362.js.map
