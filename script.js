let numbersContainer = document.querySelector(".numbers");
createNumbers();

let operators = document.querySelectorAll(".operator");
let numbers = document.querySelectorAll(".number");
let display = document.querySelector(".display");
let buttons = document.querySelectorAll("button");
let equal = document.querySelector(".equal *");
let clear = document.querySelector(".clear");
let a = null,
  b = null,
  totalDigitForA = "",
  totalDigitForB = "",
  totalDisplayForA = "",
  totalDisplayForB = "",
  numberOfTerms = 0,
  operator = null,
  tempOperator = null,
  operatorsPressed = [],
  i = 0;

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
  return Number((a * b).toFixed(2));
}

function divide(a, b) {
  if (b === 0) return "Don't divide by 0 plz";
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
      operatorsPressed.push(op.textContent);
      numberOfTerms++;

      if (numberOfTerms > 1 && a !== null && b !== null && b !== 0) {
        display.textContent = operate(a, b, operatorsPressed[i]);
        a = operate(a, b, operatorsPressed[i++]);
      }
    }),
  );
}

function updateLiterals() {
  numbers.forEach((number) =>
    number.addEventListener("click", () => {
      if (display.textContent === "0") display.textContent = "";

      if (numberOfTerms > 1) {
        totalDisplayForB = "";
        totalDigitForB = "";
      }
      if (operatorsPressed.length === 0) {
        totalDigitForA += number.textContent;
        totalDisplayForA += number.textContent;
        display.textContent = totalDisplayForA;
      }

      if (operatorsPressed.length !== 0) {
        totalDigitForB += number.textContent;
        totalDisplayForB += number.textContent;
        display.textContent = totalDisplayForB;
      }
      if (numberOfTerms === 0) a = +totalDigitForA;
      b = +totalDigitForB;
      console.log(a);
      console.log(operatorsPressed[i]);
      console.log(b);
    }),
  );
}

function displayResult() {
  updateOperator();
  updateLiterals();

  equal.addEventListener("click", () => {
    if (operatorsPressed.length === 0) return;
    display.textContent = operate(
      a,
      b,
      operatorsPressed[operatorsPressed.length - 1],
    );
  });
}

displayResult();
