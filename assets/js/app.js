// Main - Portada
const header = document.querySelector("header");
window.addEventListener("scroll", function() {
    header.classList.toggle ("sticky", this.window.scrollY > 120);
});

/*
const navToggle = document.querySelector("nav-toggle");
const navList = document.querySelector("nav-list");

navToggle.addEventListener("click", ()=> {
    navList.classList.toggle("nav-list-visible");
});
*/