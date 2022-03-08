"use strict";

// Lock scroll on body
var lockScroll = function lockScroll() {
  document.body.classList.toggle("js-lock");

  if (!document.body.classList.contains("js-lock")) {
    document.body.toggleAttribute("class");
  } else {
    null;
  }
}; // Click on overlay


var overlay = document.querySelector(".overlay");
var form = document.querySelector("#form");
overlay === null || overlay === void 0 ? void 0 : overlay.addEventListener("click", function () {
  var formFieldInput = document.querySelectorAll(".form__field input");
  var formFieldLabel = document.querySelectorAll(".js-invalid-label");

  for (var i = 0; i < formFieldInput.length; i++) {
    formFieldInput[i].classList.remove('js-invalid');
  }

  for (var _i = 0; _i < formFieldLabel.length; _i++) {
    formFieldLabel[_i].remove();
  }

  modalToggleVisible();
});

// Custom counter
let totalBasic = document.querySelector('.total-basic');
let totalPro = document.querySelector('.total-pro');
let discountBasic = document.querySelector('.discount-basic');
let discountPro = document.querySelector('.discount-pro');
let totalBasicWrapper = document.querySelector('.total-basic-wrapper');
let totalProWrapper = document.querySelector('.total-pro-wrapper');

var counterItem = document.querySelectorAll(".counter__item");
counterItem === null || counterItem === void 0 ? void 0 : counterItem.forEach(function (e) {
  var counterInput = e.querySelector(".counter__input");

  var counterPlus = e.querySelector(".counter__plus");
  var counterMinus = e.querySelector(".counter__minus");
  var counterMax = parseInt(counterInput.getAttribute("max"));
  var counterMin = parseInt(counterInput.getAttribute("min"));


  counterPlus.addEventListener("click", function () {
    if (counterInput.value >= counterMax) {
      counterInput.value = counterMax;
    } else {
      counterInput.value++;
      counterInput.setAttribute("value", counterInput.value);
    }
    updatePlanValue()
  });
  counterMinus.addEventListener("click", function () {
    if (counterInput.value <= counterMin) {
      counterInput.value = counterMin;
    } else {
      counterInput.value--;
      counterInput.setAttribute("value", counterInput.value);
    }
    updatePlanValue()
  });
  counterInput.addEventListener("keyup", function () {
    if (counterInput.value >= counterMax) {
      counterInput.value = counterMax;
      
    } else if (counterInput.value <= counterMin) {
      counterInput.value = counterMin;
    } else {
      null;
    }
    updatePlanValue()
  });

  var counterPlanners = document.querySelector(".counter__planners");
  var counterViewers = document.querySelector(".counter__viewers");

  let multiplierPlannerBasic = 8;
  let multiplierPlannerPro = 10;
  let multiplierViewer = 3;


  function updatePlanValue() {
    let counterPlannersVal = counterPlanners.value
    let counterViewersVal = counterViewers.value
    
    totalBasic.innerHTML = (counterPlannersVal * multiplierPlannerBasic) + (counterViewersVal * multiplierViewer);
    totalPro.innerHTML = (counterPlannersVal * multiplierPlannerPro) + (counterViewersVal * multiplierViewer);

    discountBasic.innerHTML = Math.round(totalBasic.innerHTML * 0.9);
    discountPro.innerHTML = Math.round(totalPro.innerHTML * 0.9);
  }
}); 

// Custom switch button

var switchLabel = document.querySelectorAll(".switch__label");
switchLabel === null || switchLabel === void 0 ? void 0 : switchLabel.forEach(function (e) {
  e.addEventListener("click", function () {
    if (e.querySelector("input").checked) {
      e.classList.add("js-toggle");
      totalBasicWrapper.classList.add('active');
      totalProWrapper.classList.add('active');
    } else {
      e.classList.remove("js-toggle");
      totalBasicWrapper.classList.remove('active');
      totalProWrapper.classList.remove('active'); 
    }
  });
}); 


// Open menu on click to Burger

var burger = document.querySelector(".burger");
var header = document.querySelector(".header");
burger.addEventListener("click", function () {
  header.classList.toggle("js-nav-open");
  lockScroll();
}); // Video

var video = document.querySelector(".video__item");
var videoPlayButton = document.querySelector(".video__play");
var videoPreview = document.querySelector(".video__preview");
videoPlayButton === null || videoPlayButton === void 0 ? void 0 : videoPlayButton.addEventListener("click", function () {
  video.style.display = "block";
  videoPlayButton.style.display = "none";
}); // Modal

var modalTrigger = document.querySelectorAll(".modal-trigger");
var modalWindow = document.querySelector(".modal");
modalTrigger === null || modalTrigger === void 0 ? void 0 : modalTrigger.forEach(function (e) {
  e.addEventListener("click", function () {
    modalToggleVisible();
  });
});

var modalToggleVisible = function modalToggleVisible() {
  modalWindow.classList.toggle("js-show");
  overlay.classList.toggle("js-show");
  lockScroll();
  setTimeout(function () {
    modalWindow.classList.remove("js-submit");
  }, 300);
}; // Validate form


if (document.querySelector("#form")) {
  var validationForm = new JustValidate("#form", {
    errorFieldCssClass: "js-invalid",
    errorLabelCssClass: "js-invalid-label",
    lockForm: true,
    errorLabelStyle: {
      textDecoration: "underlined"
    }
  });
  validationForm.addField("#user_name", [{
    rule: "minLength",
    value: 3,
    errorMessage: "Minimum 3 characters required"
  }, {
    rule: "required",
    errorMessage: "Name is required"
  }]).addField("#user_email", [{
    rule: "required",
    errorMessage: "Email is required"
  }, {
    rule: "email",
    errorMessage: "Email is invalid"
  }]).onSuccess(function (e) {
    e.preventDefault();

    if (modalWindow) {
      modalWindow.classList.add("js-submit");
    } else {
      if (document.documentElement.lang === "en") {
        window.location.href = 'en-thanks.html';
      } else if (document.documentElement.lang === "de") {
        window.location.href = 'thanks.html';
      }
    }
  });

  if (document.querySelector("#user_company")) {
    validationForm.addField("#user_company", [{
      rule: "required",
      errorMessage: "Company is required"
    }]);
  };
}; // Dropdown"s

if (!Element.prototype.closest) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  };

  Element.prototype.closest = function (s) {
    var el = this;
    var ancestor = this;
    if (!document.documentElement.contains(el)) return null;

    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);

    return null;
  };
};

function closeOpenNavs() {
  var openDrops = document.querySelectorAll(".dropdown__trigger");

  for (var i = 0; i < openDrops.length; i++) {
    var openDropdown = openDrops[i];

    if (openDropdown.parentElement.classList.contains("js-open")) {
      openDropdown.parentElement.classList.remove("js-open");
    };
  };
}
;
document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown__trigger")) {
    closeOpenNavs();
  } else if (event.target.closest(".dropdown__trigger") && event.target.parentElement.closest(".js-open")) {
    event.target.closest(".dropdown__trigger").parentElement.classList.remove("js-open");
  } else if (event.target.closest(".dropdown__trigger")) {
    closeOpenNavs();
    event.target.closest(".dropdown__trigger").parentElement.classList.add("js-open");
  }
}, false); // Plan slider

var planSlider = new Swiper(".plan__slider", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  speed: 300,
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3
    }
  },
  pagination: {
    el: ".plan__pagination"
  },
  navigation: {
    nextEl: ".plan__button-next",
    prevEl: ".plan__button-prev"
  }
});
var testimonialSlider = new Swiper(".testimonials__slider", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  speed: 300,
  pagination: {
    el: ".testimonials__pagination"
  },
  navigation: {
    nextEl: ".testimonials__button-next",
    prevEl: ".testimonials__button-prev"
  }
});

if (window.matchMedia("(min-width: 992px)").matches) {
  // Custom scrollbar
  document.addEventListener("DOMContentLoaded", function () {
    OverlayScrollbars(document.querySelectorAll("body"), {});
  });
} else {
  // Benefits slider
  var benefitsSlider = new Swiper(".benefits__slider", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 300,
    breakpoints: {
      768: {
        slidesPerView: 2
      }
    },
    pagination: {
      el: ".benefits__pagination"
    },
    navigation: {
      nextEl: ".benefits__button-next",
      prevEl: ".benefits__button-prev"
    }
  });
};