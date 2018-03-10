window.Utils = (function () {
  function Utils() {
  }

  Utils.prototype.simulateClickOn = function (htmlElement, {clientX: left, clientY: top}) {
    const clickDiv = document.createElement('div');
    clickDiv.classList.add('click-effect');
    Object.assign(clickDiv.style, {top, left});
    htmlElement.appendChild(clickDiv);
    clickDiv.addEventListener('animationend', () => {
      clickDiv.parentNode.removeChild(clickDiv);
    });
  };

  Utils.prototype.changeCursorPosition = function(cursor, {clientX, clientY}) {
    cursor.style.top = clientY;
    cursor.style.left = clientX;
  };

  Utils.prototype.createCursorElementOn = function (htmlElement) {
    const cursor = document.createElement('img');
    cursor.setAttribute('src', 'assets/cursor.svg');
    cursor.classList.add('cursor');
    return htmlElement.appendChild(cursor);
  };

  Utils.prototype.insertCSS = function () {
    const cssTag = document.createElement('link');
    const options = {
      rel: 'stylesheet',
      href: 'styles/main.css'
    };
    Object.assign(cssTag, options);
    document.querySelector('head').appendChild(cssTag);
  };

  Utils.prototype.resetDom = function () {
    while (document.firstChild) {
      document.removeChild(document.firstChild);
    }
  };

  return new Utils();
})();

