let currentResult = 0;
let validOperands = ['+', '/', '*', '-'];

function updateCurrentResult(operation, userInput) {
  if (!validOperands.includes(operation)) {
    alert('Invalid operand');
  }

  if (operation === '+') {
    currentResult += userInput;
  } else if (operation === '-') {
    currentResult -= userInput;
  } else if (operation === '*') {
    currentResult *= userInput;
  } else if (operation === '/' && userInput) {
    currentResult /= userInput;
  }
  currentResult = Math.round(currentResult * 1000) / 1000;
}

function handleCalculation(operation) {
  const previousResult = currentResult;
  const userInput = parseFloat(getUserInput());

  if (!isNaN(userInput)) {
    updateCurrentResult(operation, userInput);
    const calculation = `${previousResult} ${operation} ${userInput}`;
    setCalculations(currentResult, calculation);
  }
}

function handleAdd() {
  handleCalculation('+');
}

function handleSubtract() {
  handleCalculation('-');
}

function handleDivide() {
  handleCalculation('/');
}

function handleMultiply() {
  handleCalculation('*');
}

addButton.addEventListener('click', handleAdd);
subtractButton.addEventListener('click', handleSubtract);
divideButton.addEventListener('click', handleDivide);
multiplyButton.addEventListener('click', handleMultiply);
