const up = document.querySelector(".arrow");

const modalWeight = document.querySelector("#modalWeight");
const weightValue = document.querySelector("#weight-value");
const lengthValue = document.querySelector("#length-value");
const modalValue = document.querySelector("#modalLength");

const form = document.querySelectorAll("form");
const inputs = document.querySelectorAll("input");
const success = document.querySelector(".modal__wrapper_success");
const modalAns = document.querySelector(".modal__wrapper");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const blur = document.querySelector(".blur");
let isValidate = false;
const backToMain = document.querySelector('.modal-form__back')

const openModalBtn = document.querySelectorAll('[data-crane]')


const showCards = document.querySelector(".cards__show");
const cards = document.querySelectorAll(".card");

const images = document.querySelectorAll('.hover-img')
const activeImg = document.querySelector('.types__img')


document.querySelector('.types__list').addEventListener('mouseover', (ev) => { 
  if (target = ev.target.closest('.types__item')) {
    let index = [...target.parentNode.children].indexOf(target);

    activeImg.style.backgroundImage = `url("${images[index].src}")`;
   
  }
})
  
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

weightValue.innerHTML = modalWeight.value + " тонны";
lengthValue.innerHTML = modalWeight.value + " метра";

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
      cards[i].style.display = 'flex';
      if (n === cards.length) showCards.style.display = 'none';
    } else  {
      cards[i].style.display = 'none';
    }
  }
}
showMore(cardsNum);

showCards.onclick = function(e) {
  e.preventDefault();
  cardsNum += 3;
  showMore(cardsNum);
}


// Формы
const openModal = () => {
  modalAns.classList.add("show");
  overlay.classList.add("show");
  blur.classList.add("show-blur");
  modal.classList.add("show");
  modal.style.position = 'absolute'
}

openModalBtn.forEach(btn => {
  btn.addEventListener('click', openModal)
})

backToMain.addEventListener('click', () => {
  success.classList.remove("show");
  overlay.classList.remove("show");
  blur.classList.remove("show-blur");
  clearInputs()
})

const clearInputs = () => {
  inputs.forEach((item) => {
    item.value = "";
  });
  document.querySelector('textarea').value = "";
};

const submit = () => {
  modal.style.position = 'fixed'
  overlay.classList.add('show')
  modalAns.classList.remove('show')
  success.classList.add("show");
  setTimeout(() => {
    success.classList.remove("show");
    overlay.classList.remove("show");
    blur.classList.remove("show-blur");
    modal.classList.remove("show");
  }, 10000);
  clearInputs()
};

const validate = (elem) => {
  const regExpPhone = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g;
  const regExpEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;

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

    const formData = new FormData(item);
    for (key of formData.keys()) {
      console.log(`${key}: ${formData.get(key)}`);
    }

    for (let elem of item.elements) {
      if (elem.tagName !== "BUTTON") {
        if (elem.value === "") {
          elem.nextElementSibling.textContent =
            "Данное поле не может быть пустым";
          elem.classList.add("error");
          isValidate = false;
        } else {
          elem.nextElementSibling.textContent = "";
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
