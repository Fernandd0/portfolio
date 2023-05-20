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
    label.innerHTML = '<img src="assets/ico/ico-sun.png" alt="sun mood" class="ico-mood ico-mood-sun" width="30" height="30"/>';
  }else {
    label.innerHTML = '<img src="assets/ico/ico-moon.png" alt="dark mood" class="ico-mood" width="30" height="30"/>';
  }
});
//Color Mood 2 for Responsive
let toggle2 = document.getElementById("toggle-2");
let label2 = document.getElementById("label_toggle-2");
toggle2.addEventListener("change", (event) => {
  let estado2 = event.target.checked;
  document.body.classList.toggle("dark-mood");
  if (estado2) {
    label2.innerHTML = '<img src="assets/ico/ico-sun.png" alt="sun mood" class="ico-mood ico-mood-sun" width="30" height="30"/>';
  }else {
    label2.innerHTML = '<img src="assets/ico/ico-moon.png" alt="dark mood" class="ico-mood ico-mood-moon" width="30" height="30"/>';
  }
});


//More About Me (text)
let btn_text = document.getElementById("btn_text");
let more_text = document.getElementById("more_text");

btn_text.addEventListener("click", changeStyle);
function changeStyle(){
  more_text.classList.toggle("c-show-text");

  if(more_text.classList.contains("c-show-text")){
    btn_text.innerHTML = "Menos sobre mi";
  } else {
    btn_text.innerHTML = "Más sobre mi";
  };
};


//Change img every 5s --> portada-img
var cont = 0;

function change() {
  cont++;
  switch(cont%3+1){
    case 1:
      document.getElementById("portada_img").src="assets/img/avatar.png";
    break;
    case 2:
      document.getElementById("portada_img").src="assets/img/avatar-2.png";
    break;
    case 3:
      document.getElementById("portada_img").src="assets/img/avatar-3.png";
    break;
  }
}
function inicio() {
  setInterval(change, 3000);
}
window.onload=inicio;


//Carrusel Projects
window.addEventListener('load', function(){
	new Glider(document.querySelector('.carousel-list'), {
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: {
			prev: '.carousel-anterior',
			next: '.carousel-siguiente'
		},
		responsive: [
			{
			  // screens greater than >= 270px
			  breakpoint: 300,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			  }
			},{
			  // screens greater than >= 1024px
			  breakpoint: 768,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			  }
			},{
			  // screens greater than >= 1024px
			  breakpoint: 1400,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			  }
			},{
			  // screens greater than >= 2560px
			  breakpoint: 2100,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			  }
			}
		]
	});
});


// Scroll to top selection
const scrollUp = document.querySelector("#scroll-up");
// scroll to top functionality
scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

buttonUp = document.getElementById("scroll-up");

// Message: update
message = document.getElementById("c-message");

window.onscroll = function(){
  var scroll = document.documentElement.scrollTop;

  if (scroll > 100){
    buttonUp.style.transform = "scale(1)";
    message.style.transform = "scale(0)";
  }else if(scroll < 100){
    buttonUp.style.transform = "scale(0)";
    message.style.transform = "scale(1)";
  }
}