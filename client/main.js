document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#switchColorBtn');
  const input = document.querySelector('#mirrorInput');
  btn.addEventListener('click', handleClick);
  input.addEventListener('keyup', handleInputChange);

});

function handleClick() {
  const leftBox = document.querySelector('#leftBox');
  const rightBox = document.querySelector('#rightBox');
  leftBox.classList.toggle('blue-background');
  rightBox.classList.toggle('blue-background');
}

function handleInputChange(e) {
  document.querySelector('#mirrorText').innerText = e.target.value;
}