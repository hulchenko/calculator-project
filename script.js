const calculator = document.querySelector('.calculator');
const screen = document.querySelector('.screen');
const keys = document.querySelector('.btn-grid');
const upperKeys = document.querySelector('.btn-grid-top');
let firstValue = '';
let secondValue = '';

upperKeys.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    const key = e.target;
    const keyContent = e.target.innerHTML;
    const action = key.dataset.action;
    const screenContent = screen.innerHTML;
    if (action === 'clear') {
      //using screenContent wouldn't work, as it changing const variable value
      screen.innerHTML = '0';
    }
    if (action === 'backspace') {
      screen.innerHTML = screen.innerHTML.slice(0, -1); //removes last character and returns a new array
    }
  }
});

keys.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    const key = e.target; //? probably don't need this
    const keyContent = e.target.innerHTML; //num
    const action = key.dataset.action; //data-action class value
    const screenContent = screen.innerHTML;
    const previousKeyType = calculator.dataset.previousKeyType;
    if (!action) {
      //any num button pressed
      if (screenContent === '0' || previousKeyType === 'operator') {
        screen.innerHTML = keyContent;
      } else {
        screen.innerHTML += keyContent;
      }
    }
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      key.classList.add('operator-click');
      calculator.dataset.previousKeyType = 'operator';
    }
    if (action === 'decimal') {
      screen.innerHTML = screenContent + '.';
    }
    if (action === 'calculate') {
      const secondValue = screenContent;
      console.log(secondValue);
    }
    Array.from(key.parentNode.children).map(function (k) {
      k.classList.remove('operator-click');
    });
  }
});
