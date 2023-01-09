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