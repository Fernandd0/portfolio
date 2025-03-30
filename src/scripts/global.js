//More About Me (text)
let btn_text = document.getElementById("btn_text");
let more_text = document.getElementById("more_text");

btn_text.addEventListener("click", changeStyle);
function changeStyle() {
  more_text.classList.toggle("c-show-text");

  if (more_text.classList.contains("c-show-text")) {
    btn_text.innerHTML = "Menos sobre mi";
  } else {
    btn_text.innerHTML = "Más sobre mi";
  }
}

//Change img every 5s --> portada-img
var cont = 0;

function change() {
  cont++;
  switch ((cont % 3) + 1) {
    case 1:
      document.getElementById("portada_img").src = "assets/img/avatar.png";
      break;
    case 2:
      document.getElementById("portada_img").src = "assets/img/avatar-2.png";
      break;
    case 3:
      document.getElementById("portada_img").src = "assets/img/avatar-3.png";
      break;
  }
}
function inicio() {
  setInterval(change, 3000);
}
window.onload = inicio;

//Carrusel Projects
window.addEventListener("load", function () {
  new Glider(document.querySelector(".carousel-list"), {
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: {
      prev: ".carousel-anterior",
      next: ".carousel-siguiente",
    },
    responsive: [
      {
        // screens greater than >= 270px
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        // screens greater than >= 1024px
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        // screens greater than >= 1024px
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        // screens greater than >= 2560px
        breakpoint: 2100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  });
});

// Scroll to top selection
const scrollUp = document.querySelector("#scroll-up");
scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

const buttonUp = document.getElementById("scroll-up");

// Message: update
document.addEventListener("DOMContentLoaded", function () {
  const messageElement = document.getElementById("c-message");

  setTimeout(() => {
    messageElement.classList.add("show");
  }, 2000);

  setTimeout(() => {
    messageElement.classList.remove("show");
    messageElement.classList.add("hide");
  }, 12000);

  window.onscroll = function () {
    var scroll = document.documentElement.scrollTop;

    if (scroll > 100) {
      messageElement.classList.remove("show");
      messageElement.classList.add("hide");
      buttonUp.style.transform = "scale(1)";
    } else {
      messageElement.classList.remove("hide");
      messageElement.classList.add("show");
      buttonUp.style.transform = "scale(0)";
    }
  };
});
