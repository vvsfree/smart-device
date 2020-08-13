'use strict';
(function () {

  /*
    Блок "Подвал сайта"
    Секции "Разделы сайта" и "Наш офис" должны скрываться на мобильной ширине
  */
  var accordionNodeList = document.querySelectorAll('.accordion');
  if (accordionNodeList) {
    var accordionArray = Array.prototype.slice.call(accordionNodeList);
    accordionArray.forEach(function (item) {
      item.classList.remove('accordion--expanded');
      item.addEventListener('click', function () {
        item.classList.toggle('accordion--expanded');
      });
    });
  }

  /*
    Плавный скроллинг к блоку "Преимущества"
  */
  var anchorElement = document.querySelector('.promo__link');
  if (anchorElement) {
    var blockID = anchorElement.getAttribute('href').substr(1);
    var blockElement = document.getElementById(blockID);
    if (blockElement) {
      anchorElement.addEventListener('click', function (e) {
        e.preventDefault();
        blockElement.scrollIntoView({behavior: 'smooth'});
      });
    }
  }

  /*
    Плавный скроллинг к блоку "Форма"
  */
  var questionButton = document.querySelector('.promo__btn');
  var formElement = document.querySelector('.advice__form');
  if (questionButton && formElement) {
    questionButton.addEventListener('click', function (e) {
      e.preventDefault();
      formElement.scrollIntoView({behavior: 'smooth'});
    });
  }

  /*
    Блок "О компании". Последний абзац текста
    На ширинах меньших десктопной нужно добавлять две точки, если длина текста больше 200
    В ТЗ этого нет, но на макете это видно
  */
  var desktopWidth = 1024;
  var aboutTextElement = document.querySelector('.about__text:last-of-type');
  if (aboutTextElement) {
    var textOriginal = aboutTextElement.textContent;
    // Реагируем на изменение ширины
    // Мониторим планшетную и мобильную ширину
    var mediaDesktop = window.matchMedia('(max-width: ' + (desktopWidth - 1) + 'px)');
    var handleWidthChange = function (evt) {
      if (evt.matches) {
        if (aboutTextElement.textContent.length > 202) {
          aboutTextElement.textContent = aboutTextElement.textContent.substring(0, 200) + '..';
        }
      } else {
        aboutTextElement.textContent = textOriginal;
      }
    };

    mediaDesktop.addListener(handleWidthChange);
    handleWidthChange(mediaDesktop);
  }

  /*
    Модальное окно обратной связи
  */
  function getItem(item) {
    var value = localStorage.getItem(item);
    return value ? value : '';
  }

  function openModal() {
    page.classList.add('page--lock');
    overlay.classList.add('overlay--visible');
    modal.classList.add('modal--visible');

    modal.querySelector('.form__input:first-of-type').focus();

    document.addEventListener('keydown', keydownEscHandler);

    callForm.customer.value = getItem('customer');
    callForm.phone.value = getItem('phone');
    callForm.question.value = getItem('question');
    callForm.agreement.checked = getItem('agreement');

    origValue = callForm.phone.value;
  }

  function closeModal() {
    page.classList.remove('page--lock');
    overlay.classList.remove('overlay--visible');
    modal.classList.remove('modal--visible');
    document.removeEventListener('keydown', keydownEscHandler);
  }

  function keydownEscHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      closeModal();
    }
  }

  var localStorage = window.localStorage;

  var page = document.querySelector('.page');
  var overlay = document.querySelector('.overlay');
  var modal = document.querySelector('.modal');
  var callForm = document.forms.call;

  var callButton = document.querySelector('.header__btn');

  var origValue;

  if (overlay && modal && callButton) {
    overlay.addEventListener('click', function () {
      closeModal();
    });

    modal.querySelector('.modal__close-btn').addEventListener('click', function () {
      closeModal();
    });

    modal.querySelector('.call-form__send-btn').addEventListener('click', function (evt) {
      callForm.phone.setCustomValidity('');

      if (/^\+7\(\d{3}\)\d{7}$/.test(callForm.phone.value) === false) {
        callForm.phone.setCustomValidity('Phone format mask is +7(123)1234567');
        return;
      }

      evt.preventDefault();

      localStorage.setItem('customer', callForm.customer.value);
      localStorage.setItem('phone', callForm.phone.value);
      localStorage.setItem('question', callForm.question.value);
      localStorage.setItem('agreement', callForm.agreement.checked);

      closeModal();
    });

    callButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openModal();
    });
  }

  callForm.phone.addEventListener('focus', function (evt) {
    // Если поле пустое, добавим начало номера
    if (!evt.target.value) {
      evt.target.value = '+7(';
      origValue = evt.target.value;
    }
  });

  callForm.phone.addEventListener('input', function (evt) {
    callForm.phone.setCustomValidity('');
    var value = evt.target.value;

    // Нужно закрыть скобку?
    var check = /^\+7\(\d{3}$/.test(value);
    if (check) {
      evt.target.value = value + ')';
    }

    // То что в поле ввода может быть частью телефона?
    check = /^\+7\(\d{0,3}(\)\d{0,7})?$/.test(value);
    if (check) {
      origValue = evt.target.value;
    } else {
      evt.target.value = origValue;
    }
  });
})();
