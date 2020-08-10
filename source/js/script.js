'use strict';
(function () {
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
