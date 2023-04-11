import { ArithmeticExpression } from "./arithmetic.js";
import { operations } from "./operation.js";

const buttons = document.querySelectorAll(".button");
const screen = document.querySelector(".output");
const calculator = document.querySelector(".calculator");
const answerscreen = document.querySelector(".answer-screen");
const trigButtons = document.querySelectorAll(".trig");
const mode = document.querySelector(".mode");

let degreeMode = false;

/*Adds the character pressed on the screen from the user*/
function characterPress(char) {
	if (screen.value === "0") screen.value = char;
	else screen.value += char;
}

function clear() {
	/*clear input character by one by one*/
	if (screen.value.length <= 1) screen.value = "0";
	else screen.value = screen.value.slice(0, -1);
}

function allClear() {
	/*Clear all the inputted characters from the screen*/
	screen.value = "0";
}

/*Calcuate the expression on the */
function calculate(input) {
	const expression = new ArithmeticExpression(operations);
	answerscreen.value = expression.evaluate(input, degreeMode).toLocaleString();
}

/*Evaluate the expression once the equal button is clicked*/
function evaluate() {
	const expression = new ArithmeticExpression(operations);
	screen.value = expression.evaluate(screen.value, degreeMode);
	mode.style.display = "none";
}

function autoCalculate() {
	/*Auto calculate the inputed value from the user*/
	if (
		(Number(screen.value[screen.value.length - 1]) ||
			screen.value[screen.value.length - 1] === "0" ||
			screen.value[screen.value.length - 1] === "!" ||
			screen.value[screen.value.length - 1] === "E" ||
			screen.value[screen.value.length - 1] === "%" ||
			screen.value[screen.value.length - 1] === "π" ||
			screen.value[screen.value.length - 1] === ")") &&
		parenthesize(screen.value)
	)
		calculate(screen.value);

	if (mode.style.display == "block" && screen.value == "0")
		mode.style.display = "none";
}

/*Switch the calculator mode between radians and degrees*/
function changeMode() {
	const modeButton = document.querySelector(".mode-btn");
	if (modeButton.innerHTML == "DEG") {
		modeButton.innerHTML = "RAD";
		[mode.innerHTML, degreeMode] = ["DEG", true];
	} else {
		modeButton.innerHTML = "DEG";
		[mode.innerHTML, degreeMode] = ["RAD", false];
	}
	autoCalculate();
}

function parenthesis() {
	/*check if there is one less unclose brace*/
	if (screen.value === "0") screen.value = "(";
	else if (
		(Number(screen.value[screen.value.length - 1]) ||
			screen.value[screen.value.length - 1] === "0" ||
			screen.value[screen.value.length - 1] === "π" ||
			screen.value[screen.value.length - 1] === "E" ||
			screen.value[screen.value.length - 1] === ")") &&
		!parenthesize(screen.value)
	)
		screen.value += ")";
	else if (!Number(screen.value[screen.value.length - 1])) {
		screen.value += "(";
	} else screen.value += "(";
}

for (let button of buttons) {
	/*Adds event listeners to each buttons of the calculator respectively*/
	if (button.value === "⌫") {
		button.addEventListener("click", clear);
	} else if (button.value === "AC") {
		button.addEventListener("click", allClear);
	} else if (button.value === "()") {
		button.addEventListener("click", parenthesis);
	} else if (button.value === "=") {
		button.addEventListener("click", evaluate);
	} else if (button.value === "M") {
		button.addEventListener("click", changeMode);
	} else {
		button.addEventListener("click", () => {
			characterPress(button.value);
		});
	}
}

function parenthesize(input) {
	/**
	 * Checks status of the amount of parenthesis inputted.
	 *
	 * @param {string} input - the input value from the screen.
	 * @returns {boolean} if there is equal enough open and close parenthesis
	 */
	let [open, close] = [0, 0];
	for (let char of input) {
		if (char === "(") open++;
		else if (char === ")") close++;
	}
	return open === close;
}

calculator.addEventListener("click", autoCalculate);

trigButtons.forEach((button) => {
	button.addEventListener("click", () => (mode.style.display = "block"));
});
