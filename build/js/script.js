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
})();
