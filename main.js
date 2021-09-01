(function () {
  'use strict'

  let display = document.querySelector('#display');

  let keys = document.querySelectorAll('.key-number');
  let keyOperation = document.querySelectorAll('.key-operation');

  let keyReset = document.querySelector('.key-reset');
  let keyDelete = document.querySelector('.key-delete');

  let keyEqual = document.querySelector('.key-equal');

  Array.prototype.forEach.call(keys, function (key) {
    key.addEventListener('click', function () {
     
      display.value += this.value;
      display.value = firstItemIsZero(display.value)

    }, false);
  });

  Array.prototype.forEach.call(keyOperation, function (key) {
    key.addEventListener('click', function () {
      display.value = removeLastOperator(display.value);
      display.value += this.value

    }, false);
  });

  keyDelete.addEventListener('click', function () {
    display.value = display.value.slice(0, -1)
  }, false);

  keyReset.addEventListener('click', function () {
    display.value = 0;
  }, false);

  keyEqual.addEventListener('click', function () {
    let allValues = display.value.match(/\d+[+x%/-]?/g);

    display.value = allValues.reduce(function (accumulated, actual) {
      let firstValue = accumulated.slice(0, -1);

      let operator = accumulated.split('').pop();

      let lastValue = removeLastOperator(actual);
      
      let lastOperator = lastItemIsOperator(actual) ? actual.split('').pop() : '';

      switch (operator) {
        case '+':
          return (Number(firstValue) + Number(lastValue)) + lastOperator;
        case '-':
          return (Number(firstValue) - Number(lastValue)) + lastOperator;
        case 'x':
          return (Number(firstValue) * Number(lastValue)) + lastOperator;
        case '/':
          return (Number(firstValue) / Number(lastValue)) + lastOperator;
        case '%':
          return (Number(firstValue) % Number(lastValue)) + lastOperator;
      }

      display.value = removeLastOperator(display.value);
    });
  }, false);

  function firstItemIsZero(value) {
    let firstItem = value.split('');

    if(firstItem[0] === '0') {
      return firstItem.pop();
    }

    return value;
  }

  function lastItemIsOperator(value) {
    let arrayOperators = ['+', '-', 'x', '/', '%'];
    let lastItem = value.split('').pop();
    let operations = arrayOperators.some(function (operator) {
      return operator === lastItem;
    });

    return operations;
  }

  function removeLastOperator(value) {
    if (lastItemIsOperator(value)) {
      return value.slice(0, -1);
    }
    return value;
  }
})();