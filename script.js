let numbersContainer = document.querySelector(".numbers");
createNumbers();

let operators = document.querySelectorAll(".operator");
let numbers = document.querySelectorAll(".number");
let display = document.querySelector(".display");
let buttons = document.querySelectorAll("button");
let equal = document.querySelector(".equal *");
let a = 0,
  b = 0,
  totalDigitForA = "",
  totalDigitForB = "",
  totalDisplayForA = "",
  totalDisplayForB = "",
  operator;

buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => button.classList.toggle("hover"));
  button.addEventListener("mouseleave", () => button.classList.toggle("hover"));
});

function createNumbers() {
  for (let i = 9; i >= 1; i--) {
    let button = document.createElement("button");
    button.textContent = `${i}`;
    button.classList.add("number");
    numbersContainer.appendChild(button);
  }
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return Number((a / b).toFixed(2));
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "×":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
  return "Invalid operator";
}

function updateOperator() {
  operators.forEach((op) =>
    op.addEventListener("click", () => {
      operator = op.textContent;
    }),
  );
}

function updateLiterals() {
  numbers.forEach((number) =>
    number.addEventListener("click", () => {
      if (display.textContent === "0") display.textContent = "";

      if (operator === undefined) {
        totalDigitForA += number.textContent;
        totalDisplayForA += number.textContent;
        display.textContent = totalDisplayForA;
      }

      if (operator !== undefined) {
        totalDigitForB += number.textContent;
        totalDisplayForB += number.textContent;
        display.textContent = totalDisplayForB;
      }
      a = +totalDigitForA;
      b = +totalDigitForB;
    }),
  );
}

function displayResult() {
  updateOperator();
  updateLiterals();
  equal.addEventListener("click", () => {
    display.textContent = operate(a, b, operator);
    console.log(a);
    console.log(operator);
    console.log(b);
  });
}

displayResult();
