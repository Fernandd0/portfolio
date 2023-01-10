// Nav hamburgerburger selections
const burger = document.querySelector(".nav-toggle");
const ul = document.querySelector(".nav-list");
const nav = document.querySelector("#nav");

// Select nav links and hamburguer
const navLink = document.querySelectorAll(".nav-link");
const navtheme = document.querySelectorAll(".toggle-theme");

// Hamburger menu function
burger.addEventListener("click", () => {
  ul.classList.toggle("show");
});

// Close hamburger menu when a link or ico-color is clicked
navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);
navtheme.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);

//Color Mood
let toggle = document.getElementById("toggle");
let label = document.getElementById("label_toggle");
toggle.addEventListener("change", (event) => {
  let estado = event.target.checked;
  document.body.classList.toggle("dark-mood");
  if (estado) {
    label.innerHTML = '<img src="assets/ico/ico-sun.png" alt="sun mood" class="ico-mood"/>';
  }else {
    label.innerHTML = '<img src="assets/ico/ico-moon.png" alt="dark mood" class="ico-mood"/>';
  }
});