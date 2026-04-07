let numbersContainer = document.querySelector(".numbers");

createNumbers();

let buttons = document.querySelectorAll("button");

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
      break;
    case "-":
      return substract(a, b);
      break;
    case "×":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
  }
  return "Invalid operator";
}
