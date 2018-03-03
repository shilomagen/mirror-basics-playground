document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#switchColorBtn')
    .addEventListener('click', handleClick);
  document.querySelector('#mirrorInput')
    .addEventListener('keyup', handleInputChange);
});

function handleClick() {
  const leftBox = document.querySelector('#leftBox');
  const rightBox = document.querySelector('#rightBox');
  leftBox.classList.toggle('blue-background');
  rightBox.classList.toggle('blue-background');
}

function handleInputChange({target: {value}}) {
  document.querySelector('#mirrorText').innerText = value;
}
