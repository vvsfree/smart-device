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

  var anchor = document.querySelector('.promo__link');
  if (anchor) {
    var blockID = anchor.getAttribute('href').substr(1);
    var block = document.getElementById(blockID);
    if (block) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        block.scrollIntoView({behavior: 'smooth'});
      });
    }
  }
})();
