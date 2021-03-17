//operators
const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

function operate(operator, a, b) {
  return operator;
}

//variables
const btn = Array.from(document.querySelectorAll('.btn'));

const screen = document.getElementById('screen');

///
btn.map((button) => {
  button.addEventListener('click', (e) => {
    switch (e.target.innerHTML) {
      default:
        screen.innerHTML += e.target.innerHTML;
        break;
      case 'CLEAR':
        screen.innerHTML = '';
        break;
      case '←':
        screen.innerHTML = screen.innerHTML.slice(0, -1); //removes last character and returns a new array
        break;
      // case '+':
      //   screen.innerHTML = add(screen.innerHTML, screen.innerHTML);
    }
  });
});
