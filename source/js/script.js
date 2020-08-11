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
  var formElement = document.querySelector('.form');
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

  if (overlay && modal && callButton) {
    overlay.addEventListener('click', function () {
      closeModal();
    });

    modal.querySelector('.modal__close-btn').addEventListener('click', function () {
      closeModal();
    });

    modal.querySelector('.call-form__send-btn').addEventListener('click', function (evt) {
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

})();
