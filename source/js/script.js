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
  var buttonElement = document.querySelector('.promo__btn');
  var formElement = document.querySelector('.form');
  if (buttonElement && formElement) {
    buttonElement.addEventListener('click', function (e) {
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
})();
