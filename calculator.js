document.addEventListener('DOMContentLoaded', function () {
  const calculator = document.getElementById('calculator');
  const log = document.createElement('div');
  log.classList.add('log');
  calculator.parentNode.insertBefore(log, calculator.nextSibling);

  let expression = '';
  let result = '';

  // Create elements
  const display = document.createElement('div');
  display.classList.add('display');
  calculator.appendChild(display);

  const buttons = [
      '7', '8', '9', '/',
      '4', '5', '6', '*',
      '1', '2', '3', '-',
      '0', '.', '=', '+',
      'C'
  ];

  buttons.forEach(button => {
      const buttonElement = document.createElement('button');
      buttonElement.classList.add('button');
      buttonElement.textContent = button;
      calculator.appendChild(buttonElement);

      buttonElement.addEventListener('click', () => {
          if (button === '=') {
              try {
                  result = evaluateExpression(expression);
                  log.textContent += `${expression} = ${result}\n`;
                  display.textContent = result;
                  expression = '';
              } catch (error) {
                  display.textContent = 'Error';
                  expression = '';
              }
          } else if (button === 'C') {
              display.textContent = '';
              expression = '';
          } else {
              expression += button;
              display.textContent = expression;
          }
      });
  });

  function evaluateExpression(expr) {
      const operators = ['+', '-', '*', '/'];
      const stack = [];
      let currentNumber = '';
      for (let i = 0; i < expr.length; i++) {
          const char = expr[i];
          if (!isNaN(parseInt(char)) || char === '.') {
              currentNumber += char;
          } else if (operators.includes(char)) {
              stack.push(parseFloat(currentNumber), char);
              currentNumber = '';
          }
      }
      stack.push(parseFloat(currentNumber));

      let result = stack[0];
      for (let i = 1; i < stack.length; i += 2) {
          const operator = stack[i];
          const operand = stack[i + 1];
          switch (operator) {
              case '+':
                  result += operand;
                  break;
              case '-':
                  result -= operand;
                  break;
              case '*':
                  result *= operand;
                  break;
              case '/':
                  if (operand === 0) {
                      throw new Error('Division by zero');
                  }
                  result /= operand;
                  break;
              default:
                  throw new Error('Invalid operator');
          }
      }
      return result;
  }

  document.addEventListener('keyup', function(event) {
    if (event.key === 'r') {
        log.textContent = '';
    }
});

function clearLogs() {
    log.textContent = '';
}
});
