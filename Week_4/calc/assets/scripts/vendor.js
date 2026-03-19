const addButton = document.getElementById('btn-add');
const subtractButton = document.getElementById('btn-subtract');
const multiplyButton = document.getElementById('btn-multiply');
const divideButton = document.getElementById('btn-divide');

const currentCalculationElement = document.getElementById(
  'current-calculation',
);
const currentResultElement = document.getElementById('current-result');

function setCalculations(result, calculation) {
  currentCalculationElement.innerText = calculation;
  currentResultElement.innerText = result;
}

function getUserInput() {
  return document.getElementById('input-number').value;
}
