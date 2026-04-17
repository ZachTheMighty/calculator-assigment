let numbersContainer = document.querySelector(".numbers");
createNumbers();

let operators = document.querySelectorAll(".operator");
let asterisk = document.querySelector(".asterisk");
let operatorPressed = false;
let numbers = document.querySelectorAll(".number");
let display = document.querySelector(".display");
let buttons = document.querySelectorAll("button");
let equal = document.querySelector(".equal *");
let clear = document.querySelector(".clear");
let del = document.querySelector(".del");
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

function createNumbers() {
  for (let i = 9; i >= 1; i--) {
    let button = document.createElement("button");
    button.textContent = `${i}`;
    button.classList.add("number");
    numbersContainer.appendChild(button);
  }
}

function add(a, b) {
  return Number((a + b).toFixed(3));
}

function substract(a, b) {
  return Number((a - b).toFixed(3));
}

function multiply(a, b) {
  return Number((a * b).toFixed(3));
}

function divide(a, b) {
  if (b === 0) return "Don't divide by 0 plz";
  return Number((a / b).toFixed(3));
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

function updateOperators(op) {
  if (a === null) return;

  operatorsPressed.push(op.textContent);
  numberOfTerms++;

  decimalPoint.disabled = false;
  decimalPoint.classList.remove("disabled");

  if (numberOfTerms > 1 && a !== null && b !== null && b !== 0) {
    display.textContent = operate(a, b, operatorsPressed[i]);
    a = operate(a, b, operatorsPressed[i++]);
    totalDisplayForB = "";
    totalDigitForB = "";
    b = null;
  }
}

function addClickEventsToOperators() {
  operators.forEach((op) =>
    op.addEventListener("click", () => updateOperators(op)),
  );
}

function updateLiterals(number) {
  if (number.textContent === "." && decimalPoint.disabled === true) return;
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
}

function addClickEventsToNumbers() {
  numbers.forEach((number) =>
    number.addEventListener("click", () => updateLiterals(number)),
  );
}

function removeLastChar(string) {
  return string.slice(0, string.length - 1);
}

function truncate() {
  if (display.textContent === "0" || (a === null && b === null)) return;

  if (numberOfTerms === 0) {
    totalDigitForA = removeLastChar(totalDigitForA);
    totalDisplayForA = removeLastChar(totalDisplayForA);
    a = +totalDigitForA;
  }

  if (operatorPressed.length !== 0) {
    totalDigitForB = removeLastChar(totalDigitForB);
    totalDisplayForB = removeLastChar(totalDisplayForB);
    b = +totalDigitForB;
  }

  display.textContent = removeLastChar(display.textContent);
}

function backspace() {
  del.addEventListener("click", () => truncate());
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
    equal.classList.add("invert-equal");
  });
  document.addEventListener("mouseup", () => {
    equal.classList.remove("invert-equal");
  });

  clear.addEventListener("mousedown", () => {
    clear.classList.add("invert-clear");
  });
  document.addEventListener("mouseup", () => {
    clear.classList.remove("invert-clear");
  });

  del.addEventListener("mousedown", () => {
    del.classList.add("invert-clear");
  });
  document.addEventListener("mouseup", () => {
    del.classList.remove("invert-clear");
  });

  numbers.forEach((number) => {
    number.addEventListener("mousedown", () => {
      number.classList.add("invert-number");
    });
    document.addEventListener("mouseup", () => {
      number.classList.remove("invert-number");
    });
  });

  operators.forEach((op) => {
    op.addEventListener("mousedown", () => {
      op.classList.add("invert-operator");
    });
    document.addEventListener("mouseup", () => {
      op.classList.remove("invert-operator");
    });
  });
}

function keySupport() {
  document.addEventListener("keydown", (event) => {
    buttons.forEach((button) => {
      if (event.key === button.textContent) {
        if (button.classList.contains("number")) {
          updateLiterals(button);
          if (event.key === ".") return;
          button.classList.toggle("invert-number");
        }

        if (button.classList.contains("operator")) {
          updateOperators(button);
          button.classList.toggle("invert-operator");
        }
      }
    });

    if (event.key === "*") {
      updateOperators(asterisk);
      asterisk.classList.toggle("invert-operator");
    }

    if (event.key === "=" || event.key === "Enter") {
      displayResult();
      equal.classList.toggle("invert-equal");
    }

    if (event.key === "Backspace") {
      truncate();
      del.classList.toggle("invert-clear");
    }

    if (event.key === "Delete") {
      clearCalculator();
      clear.classList.toggle("invert-clear");
      display.textContent = "0";
    }
  });

  document.addEventListener("keyup", (event) => {
    buttons.forEach((button) => {
      if (event.key === button.textContent) {
        if (button.classList.contains("number")) {
          if (event.key === ".") return;
          button.classList.toggle("invert-number");
        }
        if (button.classList.contains("operator"))
          button.classList.toggle("invert-operator");
      }
    });

    if (event.key === "*") asterisk.classList.toggle("invert-operator");

    if (event.key === "=" || event.key === "Enter")
      equal.classList.toggle("invert-equal");

    if (event.key === "Backspace") {
      del.classList.toggle("invert-clear");
    }

    if (event.key === "Delete") {
      clear.classList.toggle("invert-clear");
      display.textContent = "0";
    }
  });
}

function displayResult() {
  if (operatorsPressed.length === 0 || b === null) return;
  display.textContent = operate(
    a,
    b,
    operatorsPressed[operatorsPressed.length - 1],
  );
  clearCalculator();
}

function runCalculator() {
  addClickEventsToOperators();
  addClickEventsToNumbers();
  backspace();
  allClear();
  invertColors();
  keySupport();

  equal.addEventListener("click", () => {
    displayResult();
  });
}

runCalculator();
