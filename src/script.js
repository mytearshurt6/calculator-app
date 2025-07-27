const numberButtons = document.querySelectorAll('.num-btn')

const deleteButton = document.querySelector('.del-btn')
const resetButton = document.querySelector('.reset-btn')

const addButton = document.querySelector('.add-btn')
const substractButton = document.querySelector('.substract-btn')
const divideButton = document.querySelector('.divide-btn')
const multiplyButton = document.querySelector('.multiply-btn')
const equalButton = document.querySelector('.equal-btn')

const dotButton = document.querySelector('.dot-btn')

const display = document.getElementById('display')

for (let button of numberButtons) {
  button.addEventListener('click', () => {
    if (display.textContent === '0') {
      display.textContent = button.textContent
    } else if (
      display.textContent
        .split(/x-|\/-|[-+x/]/)
        .pop()
        .startsWith('0')
    ) {
      display.textContent = display.textContent.slice(0, -1) + button.textContent
    } else {
      display.textContent += button.textContent
    }
  })
}

deleteButton.addEventListener('click', () => {
  if (display.textContent !== '0' && display.textContent.length !== 1) {
    display.textContent = display.textContent.slice(0, -1)
  } else {
    display.textContent = '0'
  }
})

resetButton.addEventListener('click', () => {
  display.textContent = '0'
})

addButton.addEventListener('click', () => {
  if (display.textContent === '-') {
    return
  } else if (display.textContent.match(/(x-|\/-)$/)) {
    display.textContent = display.textContent.slice(0, -2) + '+'
  } else if (display.textContent.match(/[-x/]$/)) {
    display.textContent = display.textContent.slice(0, -1) + '+'
  } else if (display.textContent[display.textContent.length - 1] !== '+') {
    display.textContent += '+'
  }
})

substractButton.addEventListener('click', () => {
  if (display.textContent === '0') {
    display.textContent = '-'
  } else if (display.textContent.match(/(x-|\/-)$/)) {
    display.textContent = display.textContent.slice(0, -2) + '-'
  } else if (display.textContent.match(/\+$/)) {
    display.textContent = display.textContent.slice(0, -1) + '-'
  } else if (
    display.textContent[display.textContent.length - 1] !== '-' ||
    display.textContent.match(/[x/]$/)
  ) {
    display.textContent += '-'
  }
})

multiplyButton.addEventListener('click', () => {
  if (display.textContent === '-') {
    return
  } else if (display.textContent.match(/(x-|\/-)$/)) {
    display.textContent = display.textContent.slice(0, -2) + 'x'
  } else if (display.textContent.match(/[+\-/]$/)) {
    display.textContent = display.textContent.slice(0, -1) + 'x'
  } else if (display.textContent[display.textContent.length - 1] !== 'x') {
    display.textContent += 'x'
  }
})

divideButton.addEventListener('click', () => {
  if (display.textContent === '-') {
    return
  } else if (display.textContent.match(/(x-|\/-)$/)) {
    display.textContent = display.textContent.slice(0, -2) + '/'
  } else if (display.textContent.match(/[+\-x]$/)) {
    display.textContent = display.textContent.slice(0, -1) + '/'
  } else if (display.textContent[display.textContent.length - 1] !== '/') {
    display.textContent += '/'
  }
})

equalButton.addEventListener('click', () => {
  // Step 1: Parse tokens from display
  const numbers = display.textContent.split(/[+\-x\/]/)
  const operators = display.textContent.match(/[+\-x\/]/g)
  const tokens = []
  for (let i = 0; i < numbers.length; i++) {
    tokens.push(numbers[i])
    if (operators && operators[i]) {
      tokens.push(operators[i])
    }
  }

  // Step 2: Define operator precedence and helpers
  const precedence = {
    '+': 1,
    '-': 1,
    x: 2,
    '/': 2,
  }
  const isOperator = (token) => ['+', '-', 'x', '/'].includes(token)

  // Step 3: Shunting Yard Algorithm — convert infix tokens to postfix
  function toPostfix(tokens) {
    const output = []
    const operatorsStack = []

    for (const token of tokens) {
      if (!isOperator(token)) {
        output.push(token)
      } else {
        while (
          operatorsStack.length > 0 &&
          precedence[operatorsStack[operatorsStack.length - 1]] >= precedence[token]
        ) {
          output.push(operatorsStack.pop())
        }
        operatorsStack.push(token)
      }
    }
    while (operatorsStack.length > 0) {
      output.push(operatorsStack.pop())
    }
    return output
  }

  // Step 4: Evaluate postfix expression
  function evaluatePostfix(postfixTokens) {
    const stack = []

    for (const token of postfixTokens) {
      if (!isOperator(token)) {
        stack.push(Number(token))
      } else {
        const b = stack.pop()
        const a = stack.pop()
        switch (token) {
          case '+':
            stack.push(a + b)
            break
          case '-':
            stack.push(a - b)
            break
          case 'x':
            stack.push(a * b)
            break
          case '/':
            stack.push(a / b)
            break
        }
      }
    }
    return stack.pop()
  }

  // Step 5: Use the functions
  const postfixTokens = toPostfix(tokens)
  const result = evaluatePostfix(postfixTokens)

  // Step 6: Display result
  display.textContent = result
})

dotButton.addEventListener('click', () => {
  if (display.textContent.match(/(x-|\/-|\+|-|\*|\/)$/)) {
    display.textContent += '0.'
  } else if (
    !display.textContent
      .split(/x-|\/-|[-+x/]/)
      .pop()
      .includes('.')
  ) {
    display.textContent += '.'
  }
})

const calc = document.querySelector('.calc-screen')

if (calc.scrollWidth > calc.clientWidth) {
  calc.style.fonsSize = '1'
}

const toggleButtons = document.querySelectorAll('input[type="radio"]')

toggleButtons.forEach((button) => {
  if (button.checked) {
    document.body.className = button.id
  }

  button.addEventListener('change', () => {
    if (button.checked) {
      document.body.className = button.id
    }
  })
})
