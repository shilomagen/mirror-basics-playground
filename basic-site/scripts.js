document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#switchColorBtn')
    .addEventListener('click', handleSwitchColor);
  document.querySelector('#mirrorInput')
    .addEventListener('keyup', handleInputChange);
  document.querySelector('#addDiv')
    .addEventListener('click', handleAddDiv);
});

function handleSwitchColor() {
  const leftBox = document.querySelector('#leftBox');
  const rightBox = document.querySelector('#rightBox');
  leftBox.classList.toggle('blue-background');
  rightBox.classList.toggle('blue-background');
}

function handleInputChange({target: {value}}) {
  document.querySelector('#mirrorText').innerText = value;
}

function handleAddDiv() {
  const div = `<div class="new-div">I'm a new div!</div>`;
  document.querySelector('#emptyDiv').innerHTML = div;
}

