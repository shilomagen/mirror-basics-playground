function simulateClickOn(body, {clientX, clientY}) {
  const clickDiv = document.createElement('div');
  clickDiv.classList.add('click-effect');
  clickDiv.style.top = clientY;
  clickDiv.style.left = clientX;
  body.appendChild(clickDiv);
  clickDiv.addEventListener('animationend', () => {
    clickDiv.parentNode.removeChild(clickDiv);
  });
}

function createCursorElementOn(body) {
  const cursor = document.createElement('img');
  cursor.setAttribute('src', '../assets/cursor.svg');
  cursor.classList.add('cursor');
  return body.appendChild(cursor);
}

function insertCSS() {
  const cssTag = document.createElement('link');
  const options = {
    rel: 'stylesheet',
    type: 'css/text',
    href: '../styles/main.css'
  };
  Object.assign(cssTag, options);
  document.querySelector('head').appendChild(cssTag);
}
