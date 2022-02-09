const up = document.querySelector(".arrow");

const modalWeight = document.querySelector("#modalWeight");
const weightValue = document.querySelector("#weight-value");
const lengthValue = document.querySelector("#length-value");
const modalLength = document.querySelector("#modalLength");

const form = document.querySelectorAll("form");
const inputs = document.querySelectorAll("input");
const success = document.querySelector(".modal__wrapper_success");
const modalAns = document.querySelector("[data-answers]");
const modalSuccess = document.querySelector("[data-success]");

const overlay = document.querySelector(".overlay");
const blur = document.querySelector(".blur");
let isValidate = false;
const backToMain = document.querySelector(".modal-form__back");

const openModalBtn = document.querySelectorAll("[data-modal]");

const showCards = document.querySelector(".cards__show");
const cards = document.querySelectorAll(".card");

const images = document.querySelectorAll(".hover-img");
const activeImg = document.querySelector(".types__img");

document.querySelector(".types__list").addEventListener("mouseover", (ev) => {
  if ((target = ev.target.closest(".types__item"))) {
    let index = [...target.parentNode.children].indexOf(target);

    activeImg.style.backgroundImage = `url("${images[index].src}")`;
  }
});

//Вверх

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 1300) {
    up.classList.add("fadeIn");
    up.classList.remove("fadeOut");
  } else {
    up.classList.add("fadeOut");
    up.classList.remove("fadeIn");
  }
});

// Input Range
function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

weightValue.innerHTML = modalWeight.value + " тонны";
lengthValue.innerHTML = modalLength.value + " метра";

const changeSliderColor = (input) => {
  input.addEventListener("mousemove", () => {
    let x = input.value;
    let color = `linear-gradient(90deg, red ${x}%, #b7b7b7 ${x}%)`;
    input.style.background = color;
  });
};

changeSliderColor(modalWeight);

modalWeight.oninput = function () {
  let value = this.value;
  weightValue.innerHTML = `${value} ${getNoun(
    value,
    "тонна",
    "тонны",
    "тонн"
  )}`;
};

modalLength.oninput = function () {
  let value = this.value;
  lengthValue.innerHTML = `${value} ${getNoun(
    value,
    "метр",
    "метра",
    "метров"
  )}`;
};

changeSliderColor(modalLength);

modalWeight.addEventListener("mousemove", () => {
  let x = modalWeight.value;
  let color = `linear-gradient(90deg, red ${x}%, #b7b7b7 ${x}%)`;
  modalWeight.style.background = color;
});

modalWeight.oninput = function () {
  let value = this.value;
  weightValue.innerHTML = `${value} ${getNoun(
    value,
    "тонна",
    "тонны",
    "тонн"
  )}`;
};

modalWeight.addEventListener("mousemove", () => {
  let x = modalWeight.value;
  let color = `linear-gradient(90deg, red ${x}%, #b7b7b7 ${x}%)`;
  modalWeight.style.background = color;
});

// Показать карточки

let cardsNum = 3;

function showMore(n) {
  for (let i = 0; i < cards.length; i++) {
    if (i < n) {
      cards[i].style.display = "flex";
      if (n === cards.length) showCards.style.display = "none";
    } else {
      cards[i].style.display = "none";
    }
  }
}
showMore(cardsNum);

showCards.onclick = function (e) {
  e.preventDefault();
  cardsNum += 3;
  showMore(cardsNum);
};

// Формы
const openModal = () => {
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  overlay.classList.remove("show");
  modalSuccess.classList.remove("show");
  modalAns.classList.remove("hidden");
  document.body.style.overflow = "";
};

openModalBtn.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

function showThanksModal() {
  modalAns.classList.add("hidden");
  openModal();
  modalSuccess.classList.add("show");
}

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});

backToMain.addEventListener("click", () => {
  closeThanksModal();
  document.body.style.overflow = "";
});

const closeThanksModal = () => {
  overlay.classList.remove("show");
  modalSuccess.classList.remove("show");
  modalAns.classList.remove("hidden");
  blur.classList.remove("show-blur");
  document.body.style.overflow = "";
};

const submit = () => {
  showThanksModal();
  clearInputs();
};

const clearInputs = () => {
  inputs.forEach((item) => {
    if (item.type === "text" && item.type === "number") {
      item.value = "";
    }
  });
  document.querySelector("textarea").value = "";
};

const validate = (elem) => {
  const regExpPhone = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g;
  const regExpEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  const regExpNumber = /[^\d]/g;

  if (elem.name === "username") {
    if (elem.value.length < 3) {
      elem.nextElementSibling.textContent =
        "Данное поле должно быть не менее 3-х символов";
      elem.classList.add("error");
      isValidate = false;
    } else {
      isValidate = true;
      elem.nextElementSibling.textContent = "";
      elem.classList.remove("error");
    }
  }

  if (elem.name === "email") {
    if (!regExpEmail.test(elem.value)) {
      elem.nextElementSibling.textContent =
        "Пожалуйста, введите правильный email";
      elem.classList.add("error");
      isValidate = false;
    } else {
      elem.nextElementSibling.textContent = "";
      elem.classList.remove("error");
      isValidate = true;
    }
  }

  if (elem.name === "phone") {
    if (!regExpPhone.test(elem.value)) {
      elem.nextElementSibling.textContent =
        "Пожалуйста, введите верный номер телефона";
      elem.classList.add("error");
      isValidate = false;
    } else {
      elem.nextElementSibling.textContent = "";
      elem.classList.remove("error");
      isValidate = true;
    }
  }

  if (elem.name === "height") {
    if (regExpNumber.test(elem.value)) {
      elem.nextElementSibling.textContent = "Пожалуйста, введите верную высоту";
      elem.classList.add("error");
      isValidate = false;
    } else {
      elem.nextElementSibling.textContent = "";
      elem.classList.remove("error");
      isValidate = true;
    }
  }
};

form.forEach((item) => {
  for (let elem of item.elements) {
    if (elem.tagName !== "BUTTON") {
      elem.addEventListener("input", () => {
        validate(elem);
      });
    }
  }
});

form.forEach((item) => {
  item.addEventListener("submit", (e) => {
    e.preventDefault();

    for (let elem of item.elements) {
      if (
        (elem.tagName !== "BUTTON" && elem.type === "text") ||
        elem.type === "number" ||
        elem.name === "question"
      ) {
        if (elem.value === "") {
          elem.nextElementSibling.textContent =
            "Данное поле не может быть пустым";
          elem.classList.add("error");
          isValidate = false;
        } else {
          elem.classList.remove("error");
          isValidate = true;
        }
      }
    }

    if (isValidate) {
      submit();
    } else {
      return;
    }
  });
});
