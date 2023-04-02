import { ArithmeticExpression } from "./arithmetic.js";
import { operations } from "./operation.js";

const buttons = document.querySelectorAll(".button");
const screen = document.querySelector(".output");
const calculator = document.querySelector(".calculator");
const answerscreen = document.querySelector(".answer-screen");

/*Adds the character pressed on the screen from the user*/
function characterPress(char) {
	if (screen.value === "0") {
		screen.value = char;
	} else {
		screen.value += char;
	}
}

function clear() {
	/*clear input character by character*/
	if (screen.value.length <= 1) {
		screen.value = "0";
	} else {
		screen.value = screen.value.slice(0, -1);
	}
}

/*Calcuate the expression on the */
function calculate() {
	const expression = new ArithmeticExpression();
	const postfix = expression.toPostFix(screen.value);
	answerscreen.value = expression
		.evaluate(postfix, operations)
		.toLocaleString();
}

/*Evaluate the expression once the equal button is clicked*/
function evaluate() {
	const expression = new ArithmeticExpression();
	const postfix = expression.toPostFix(screen.value);
	screen.value = expression.evaluate(postfix, operations);
}

function parenthesis() {
	/*check if there is one less unclose brace*/
	if (
		screen.value.includes("(") &&
		screen.value.lastIndexOf(")") === -1 &&
		Number(screen.value[screen.value.length - 1])
	)
		screen.value += ")";
	else if (
		screen.value.includes("(") &&
		screen.value.lastIndexOf(")") === -1 &&
		!Number(screen.value[screen.value.length - 1])
	)
		screen.value += "(";
	else {
		if (screen.value === "0") screen.value = "(";
		else screen.value += "(";
	}
}

for (let button of buttons) {
	/*Adds event listeners to each buttons of the calculator respectively*/
	if (button.value === "~") {
		button.addEventListener("click", clear);
	} else if (button.value === "()") {
		button.addEventListener("click", parenthesis);
	} else if (button.value === "=") {
		button.addEventListener("click", evaluate);
	} else {
		button.addEventListener("click", () => {
			characterPress(button.value);
		});
	}
}

calculator.addEventListener("click", () => {
	if (
		Number(screen.value[screen.value.length - 1]) ||
		screen.value[screen.value.length - 1] === "0" ||
		screen.value[screen.value.length - 1] === "!"
	)
		calculate();
	else if (
		answerscreen.value !== "0" &&
		!Number(screen.value[screen.value.length - 1])
	);
});
