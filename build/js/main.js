'use strict';

/**
 * Разбил на несколько модулей IIFE для удобства
 * Если необходимо, будет легко разбить на несколько JS файлов
 */

(function () {

  /*
    Блок "Подвал сайта"
    Секции "Разделы сайта" и "Наш офис" должны скрываться на мобильной ширине
  */

  var EXPANDED_PANEL_CLASS_NAME = 'accordion--expanded';

  var accordionNodeList = document.querySelectorAll('.accordion');
  if (accordionNodeList) {
    var accordionArray = Array.prototype.slice.call(accordionNodeList);
    accordionArray.forEach(function (item) {
      item.classList.remove(EXPANDED_PANEL_CLASS_NAME);

      item.querySelector('.accordion__control').addEventListener('click', function () {
        if (!item.classList.contains(EXPANDED_PANEL_CLASS_NAME)) {
          // Открываем панель и перед этим закрываем уже открытую
          var expandedPanel = document.querySelector('.' + EXPANDED_PANEL_CLASS_NAME);
          if (expandedPanel) {
            expandedPanel.classList.remove(EXPANDED_PANEL_CLASS_NAME);
          }
        }
        item.classList.toggle(EXPANDED_PANEL_CLASS_NAME);
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
  var aboutTextElement = document.querySelector('.about p:last-of-type');
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
})();

(function () {
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

    modal.querySelector('.form__label:first-of-type > input').focus();

    document.addEventListener('keydown', keydownEscHandler);

    callForm.customer.value = getItem('customer');
    callForm.phone.value = getItem('phone');
    callForm.question.value = getItem('question');
  }

  function closeModal() {
    page.classList.remove('page--lock');
    overlay.classList.remove('overlay--visible');
    modal.classList.remove('modal--visible');
    document.removeEventListener('keydown', keydownEscHandler);

    localStorage.setItem('customer', callForm.customer.value);
    localStorage.setItem('phone', callForm.phone.value);
    localStorage.setItem('question', callForm.question.value);
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

  if (overlay && modal && callButton && callForm) {
    overlay.addEventListener('click', function () {
      closeModal();
    });

    modal.querySelector('.modal__close-btn').addEventListener('click', function () {
      closeModal();
    });

    callButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openModal();
    });

    callForm.addEventListener('submit', function () {
      closeModal();
    });
  }
})();

(function () {
  /*
    Настройка форм обратной связи
  */
  function set(form) {
    var origValue;

    form.phone.addEventListener('focus', function (evt) {
      // Если поле пустое, добавим начало номера
      if (!evt.target.value) {
        evt.target.value = '+7(';
      }
      origValue = evt.target.value;
    });

    form.phone.addEventListener('input', function (evt) {
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

    form.querySelector('.btn').addEventListener('click', function () {
      validate(form);
    });

    form.addEventListener('change', function () {
      validate(form);
    });
  }

  function validate(form) {
    form.customer.setCustomValidity('');
    form.phone.setCustomValidity('');
    form.agreement.setCustomValidity('');

    if (!form.customer.value) {
      form.customer.setCustomValidity('Необходимо заполнить имя');
    }

    if (/^\+7\(\d{3}\)\d{7}$/.test(form.phone.value) === false) {
      form.phone.setCustomValidity('Формат номера телефона должен быть +7(123)1234567');
    }

    if (!form.agreement.checked) {
      form.agreement.setCustomValidity('Необходимо Ваше согласие на обработку персональных данных');
    }
  }

  var forms = document.querySelectorAll('.form');
  for (var i = 0; i < forms.length; i++) {
    set(document.forms[i]);
  }
})();
