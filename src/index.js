module.exports = function zeros(expression) {
  const trailingZeroesForFactorial = number => {
    if (number < 0) return -1;
    let count = 0;
    
    for (let i = 5; number / i >= 1; i *= 5) {
      count += Math.trunc(number / i);

    }

    return count;
  }

  const trailingZeroesForDoubleFactorial = number => {
    let countFiveNumbers = 0;
    let countTwoNumbers = 0;

    for (let i = number; i > 0; i -= 2) {
      for (let temp = i; temp % 5 == 0; temp /= 5) {
        countFiveNumbers++;
      }
      for (let temp = i; temp % 2 == 0; temp /= 2) {
        countTwoNumbers++;
      }
    }

    return number % 2 === 0 ? Math.min(countFiveNumbers, countTwoNumbers) : countFiveNumbers;
  }

  let arrayOfNumbers = expression.split('*');
  if (arrayOfNumbers.every(number => number.includes('!!') && (parseInt(number, 10) % 2 !== 0))) {
    return 0;
  }
  let arrayOfFactorials = arrayOfNumbers.map(number => number.includes('!!') ? trailingZeroesForDoubleFactorial(parseInt(number, 10)) : trailingZeroesForFactorial(parseInt(number, 10)));
  let product = arrayOfFactorials.reduce((accumulator, currentValue) => accumulator += currentValue, 0);
  return product;
}