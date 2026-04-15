let numbersContainer = document.querySelector(".numbers");
createNumbers();

let operators = document.querySelectorAll(".operator");
let operatorPressed = false;
let numbers = document.querySelectorAll(".number");
let display = document.querySelector(".display");
let buttons = document.querySelectorAll("button");
let equal = document.querySelector(".equal *");
let clear = document.querySelector(".clear");
let decimalPoint = document.querySelector(".decimal");
let a = null,
  b = null,
  totalDigitForA = "",
  totalDigitForB = "",
  totalDisplayForA = "",
  totalDisplayForB = "",
  numberOfTerms = 0,
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
  return Number((a + b).toFixed(2));
}

function substract(a, b) {
  return Number((a - b).toFixed(2));
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
      if (a === null) return;

      operatorsPressed.push(op.textContent);
      numberOfTerms++;

      op.classList.toggle("invert-operator");

      decimalPoint.disabled = false;
      decimalPoint.classList.remove("disabled");

      if (numberOfTerms > 1 && a !== null && b !== null && b !== 0) {
        display.textContent = operate(a, b, operatorsPressed[i]);
        a = operate(a, b, operatorsPressed[i++]);
        totalDisplayForB = "";
        totalDigitForB = "";
        b = null;
      }
    }),
  );
}

function updateLiterals() {
  numbers.forEach((number) =>
    number.addEventListener("click", () => {
      if (display.textContent === "0") display.textContent = "";

      if (number.textContent === ".") {
        decimalPoint.disabled = true;
        decimalPoint.classList.add("disabled");
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

      operators.forEach((op) => {
        if (
          op.textContent === operatorsPressed[operatorsPressed.length - 1] &&
          totalDigitForB.length === 1
        )
          op.classList.toggle("invert-operator");
      });
    }),
  );
}

function clearCalculator() {
  ((a = null),
    (b = null),
    (totalDigitForA = ""),
    (totalDigitForB = ""),
    (totalDisplayForA = ""),
    (totalDisplayForB = ""),
    (numberOfTerms = 0),
    (operatorsPressed = []),
    (i = 0));
  decimalPoint.disabled = false;
  decimalPoint.classList.remove("disabled");
}

function allClear() {
  clear.addEventListener("click", () => {
    clearCalculator();
    display.textContent = "0";
  });
}

function invertColors() {
  equal.addEventListener("mousedown", () => {
    equal.classList.toggle("invert-equal");
  });
  equal.addEventListener("mouseup", () => {
    equal.classList.toggle("invert-equal");
  });

  clear.addEventListener("mousedown", () => {
    clear.classList.toggle("invert-clear");
  });
  clear.addEventListener("mouseup", () => {
    clear.classList.toggle("invert-clear");
  });

  numbers.forEach((number) => {
    number.addEventListener("mousedown", () => {
      number.classList.toggle("invert-number");
    });
    number.addEventListener("mouseup", () => {
      number.classList.toggle("invert-number");
    });
  });
}

function displayResult() {
  updateOperator();
  updateLiterals();
  allClear();
  invertColors();
  equal.addEventListener("click", () => {
    if (operatorsPressed.length === 0 || b === null) return;
    display.textContent = operate(
      a,
      b,
      operatorsPressed[operatorsPressed.length - 1],
    );
    clearCalculator();
  });
}

displayResult();
