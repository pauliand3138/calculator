const ADD = "+";
const MULTIPLY = "*";
const DIVIDE = "/";
const SUBTRACT = "-";
const EQUAL = "=";
const DEFAULT_VALUE = 0;

const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]")
const equalOp = document.getElementById("equal");
const clearOp = document.getElementById("clear");
const deleteOp = document.getElementById("delete");
const decimal = document.getElementById("decimal");
const inputDiv = document.getElementById("input");
const historyDiv = document.getElementById("history");

const numberSequence = {
    "zero"  : "0",
    "one"   : "1",
    "two"   : "2",
    "three" : "3",
    "four"  : "4",
    "five"  : "5",
    "six"   : "6",
    "seven" : "7",
    "eight" : "8",
    "nine"  : "9"
}

const operatorsObject = {
    "add" : "+",
    "subtract" : "-",
    "multiply" : "*",
    "divide" : "/"
}

let currentNumber = "";
let previousNumber = "";
let operator = "";

window.onkeydown = (e) => keyboardInput(e);
equalOp.onclick = () => {
    if (currentNumber != "" && previousNumber != "") {
        calculate();
    }
}
clearOp.onclick = () => clear();
deleteOp.onclick = () => deleteNumber();
decimal.onclick = () => appendPeriod();

numbers.forEach( (numberButton) => {
    numberButton.onclick = () => appendNumber(numberSequence[numberButton.id]);
});

function appendNumber(number) {
    if(inputDiv.textContent == "0") {
        currentNumber = number;
    } else if (inputDiv.textContent.length <= 11) {
        currentNumber += number;
    }
    inputDiv.textContent = currentNumber;
}

operators.forEach( (operatorButton) => {
    operatorButton.onclick = () => operate(operatorsObject[operatorButton.id]);
});


function operate(op) {
    if (previousNumber === "") {
        previousNumber = currentNumber
        operatorCheck(op);
    } else if (currentNumber === "") {
        operatorCheck(op);
    } else {
        calculate();
        operator = op;
        inputDiv.textContent = "0";
        historyDiv.textContent = previousNumber + " " + operator;
    }
}

function operatorCheck(text) {
    operator = text;
    historyDiv.textContent = previousNumber + " " + operator;
    inputDiv.textContent = "0";
    currentNumber = "";
}

function calculate() {
    previousNumber = Number(previousNumber);
    currentNumber = Number(currentNumber);

    if (operator === "+") {
        previousNumber += currentNumber;
    } else if (operator === "*") {
        previousNumber *= currentNumber; 
    } else if (operator === "-") {
        previousNumber -= currentNumber;
    } else if (operator === "/") {
        if (currentNumber <= 0) {
            previousNumber = "Unable to divide by 0";
            displayResults();
            return;
        }
        previousNumber /= currentNumber;
    }
    previousNumber = +previousNumber.toFixed(3).toString();
    displayResults();
}

function displayResults() {
    historyDiv.textContent = "";
    inputDiv.textContent = previousNumber;
    operator = "";
}

function appendPeriod() {
    if (!inputDiv.textContent.includes('.')) {
        inputDiv.textContent += '.';
        currentNumber += ".";
    }
}

function deleteNumber() {
    if (inputDiv.textContent.length > 1) {
        inputDiv.textContent = input.textContent.substring(0, input.textContent.length - 1);
    } else {
        inputDiv.textContent = 0;
    }
}

function clear() {
    currentNumber = "";
    previousNumber = "";
    operator = "";
    inputDiv.textContent = "0";
    historyDiv.textContent = "";
}

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        appendNumber(e.key.toString());
    }

    if (e.key === "Enter" || e.key === "=" && currentNumber != "" && previousNumber != "") {
        calculate();
    }

    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        operate(e.key);
    }

    if (e.key === ".") {
        appendPeriod();
    }

    if (e.key === "Backspace") {
        deleteNumber();
    }
}