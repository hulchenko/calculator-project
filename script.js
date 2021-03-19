const calculator = document.querySelector('.calculator');
const screen = document.querySelector('.screen');
const keys = document.querySelector('.btn-grid');
const upperKeys = document.querySelector('.btn-grid-top');
let firstValue = '';
let secondValue = '';

//basic operations:
function add(a, b) {
  return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
  return parseInt(a) - parseInt(b);
}

function multiply(a, b) {
  return parseInt(a) * parseInt(b);
}

function divide(a, b) {
  return parseInt(a) / parseInt(b);
}
//operator function
function calculate(a, operator, b) {
  let result = '';
  if (operator === 'add') {
    result = add(a, b);
  } else if (operator === 'subtract') {
    result = subtract(a, b);
  } else if (operator === 'multiply') {
    result = multiply(a, b);
  } else if (operator === 'divide') {
    result = divide(a, b);
  }
  return result;
}

upperKeys.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    const key = e.target;
    const keyContent = e.target.innerHTML;
    const action = key.dataset.action;
    const screenContent = screen.innerHTML;
    let previousKeyType = calculator.dataset.previousKeyType;
    if (action === 'clear') {
      //using screenContent wouldn't work, as it changing const variable value
      calculator.dataset.previousKeyType = 'clear';
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
      if (
        screenContent === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        screen.innerHTML = keyContent;
      } else {
        screen.innerHTML += keyContent;
      }
      calculator.dataset.previousKey = 'number';
    }
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      //at this point calculator knows only 1st value
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = screenContent;

      if (
        firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate' //to avoid operators' calculations after calc button was clicked
      ) {
        //calculate values on multiple operators clicks
        const calcValue = calculate(firstValue, operator, secondValue); //take result value and memorize it in calcValue;
        screen.innerHTML = calcValue;
        calculator.dataset.firstValue = calcValue; //reassign calcValue under firstValue, to enable proper calculations upon multiple operator clicks without hitting calculate operator
      } else {
        calculator.dataset.firstValue = screenContent;
      }

      key.classList.add('operator-click'); //to define operator buttons on click
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.operator = action;
    }
    if (action === 'decimal') {
      if (!screen.innerHTML.includes('.')) {
        screen.innerHTML = screenContent + '.';
      } else if (
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        screen.innerHTML = '0.';
      }
      calculator.dataset.previousKeyType = 'decimal';
    }
    if (action === 'calculate') {
      //at this point calculator knows only 2nd value
      let firstValue = calculator.dataset.firstValue; // change setting to *let* as it's going to change on every calculate iteration
      const operator = calculator.dataset.operator;
      let secondValue = screenContent;

      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = screenContent;
          secondValue = calculator.dataset.modValue; //#2 assigning modValue into secondValue for the consecutive calculations
        }
        screen.innerHTML = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.modValue = secondValue; //#1 memorizing secondValue in a separate variable for next calculation
      calculator.dataset.previousKeyType = 'calculate';
    }
    Array.from(key.parentNode.children).map(function (k) {
      k.classList.remove('operator-click');
    });
  }
});

//The clear key has two uses
