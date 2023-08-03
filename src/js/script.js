// INITIAL CODE
const prevOperationText = document.querySelector('#operation-prev');
const currentOperationText = document.querySelector('#operation-current');
const buttons = document.querySelectorAll('#buttons button');

class Calculator {
    constructor(prevOperationText, currentOperationText) {
        // GET THE VALUE THAT WAS PRINTED ON THE SCREEN
        this.prevOperationText = prevOperationText;
        this.currentOperationText = currentOperationText;
        // GET THE VALUE THAT IT'S BEEN PRINTED ON THE SCREEN MOMENT
        this.currentOperation = "";
    }

    // METHOD THAT ADDS A DIGIT TO THE CURRENT OPERATION ↓
    addDigit(digit) {

        // IF THE DIGIT IS A DOT AND THE CURRENT OPERATION ALREADY HAS A DOT, IT WILL NOT BE ADDED
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit; // ADDED THE VALUE AT CURRENT OPERATION
        this.updateScreen(); // UPDATE SCREEN CALCULATOR

    }

    // PROCESS CALCULATOR OPERATIONS
    processOperation(operation) {
        // CHECK IF THE CURRENT OPERATION IS EMPTY OR ISN'T EQUAL C
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            if (this.prevOperationText.innerText !== "") {
                //CHANGE OPERATION INTO OPERATION
                this.changeOperation(operation);
            }
            return; // IF CURRENT OPERATION IS EMPTY, THEN RETURN
        }

        // GET THE VALUE AT CURRENT AND PREVIOUS OPERATION
        let operationValue;
        // SPLIT: MAKES AN ARRAY OF VALUES AND BREAK IN OTHERS ARRAYS IF FINDS SPACE
        const previous = +this.prevOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-": 
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "C":
                this.processClearOperator();
                break;
            case "CE":
                this.processClearEntryOperator();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    // METHOD THAT UPDATES THE SCREEN CALCULATOR ↓
    updateScreen(
        // SET THE DEFAULT VALUES
        operationValue = null,
        operation = null,
        current = null,
        previous = null) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {

            if (previous === 0) {
                operationValue = current;
            }

            // THIS MAKES THE CURRENT OPERATION BE THE PREVIOUS OPERATION
            this.prevOperationText.innerText = `${operationValue} ${operation}`;
            // THIS RETURN THE CURRENT OPERATION TO ZERO
            this.currentOperationText.innerText = "";
        }
    }

    changeOperation(operation) {
        const mathOperation = ["*", "/", "+", "-"];

        // IF CURRENT OPERATION ISN'T AN MATH OPERATION, THEN IGNORE AND RETURN
        if (!mathOperation.includes(operation)) {
            return;
        }

        // GET THE MATH OPERATION AND REMOVE IT, THEN ADD THE NEW MATH OPERATION
        this.prevOperationText.innerText = this.prevOperationText.innerText.slice(0, -1) + operation;
    }

    // DELETE THE LAST STRING FROM THE OPERATION
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // CLEAR ALL THE OPERATION
    processClearOperator() {
        this.currentOperationText.innerText = "";
        this.prevOperationText.innerText = "";
    }

    // CLEAR THE LAST ENTRY CURRENT OPERATION
    processClearEntryOperator() {
        this.currentOperationText.innerText = "";
    }

    processEqualOperator() {
        // GET THE SECOND PART OF PREVIOUS OPERATIO; FIRST PART IS ON LINE 42
        const operation = prevOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

// CREATE A NEW INSTANCE OF THE CLASS CALCULATOR
const calc = new Calculator(prevOperationText, currentOperationText);

buttons.forEach((button) => {
    // FOR EACH BUTTON, THIS PROPERTY SETS THE EVENT LISTENER
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;
        // CONST THAT GETS VALUE OF THE CLICKED BUTTON

        if (+value >= 0 || value === ".") {
            // IF THE VALUE IS A NUMBER OR A DOT, IT WILL BE ADDED TO THE CURRENT OPERATION
            calc.addDigit(value);
        } else {
            // IF THE VALUE IS AN OPERATOR, IT WILL BE ADDED TO THE PREVIOUS OPERATION
            calc.processOperation(value);
        }
    })
});