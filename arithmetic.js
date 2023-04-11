// const operations = require("./operation");

// Defining a class for arithmetic expression
export class ArithmeticExpression {
	constructor(operations) {
		this.operations = operations;
		[this.stack, this.postFixExp] = [[], []];
		this.operands = {
			"+": 0,
			"−": 0,
			"×": 1,
			"÷": 1,
			"^": 1,
			"%": 2,
			"√": 2,
			"!": 2,
			"log(": 3,
			"ln(": 3,
			"exp(": 3,
			"tan(": 3,
			"sin(": 3,
			"cos(": 3,
			"cos-1(": 3,
			"sin-1(": 3,
			"tan-1(": 3,
		};

		this.constants = {
			π: 3.141592653589793,
			E: 2.718281828459045,
		};
	}

	// method to convert degrees to radians
	toDeg(number) {
		let exp = this.stack[this.stack.length - 2];
		if (
			this.operands[exp] === 3 &&
			exp !== "ln(" &&
			exp !== "log(" &&
			exp !== "exp("
		) {
			if (exp == "tan-1(" || exp == "cos-1(" || exp == "sin-1(") {
				exp = this.stack.splice(this.stack.length - 2, 1).pop();
				return this.inverse(this.operations[exp](exp, number));
			}
			return (Number(number) * Math.PI) / 180;
		}
		return number;
	}

	//method to convert radians to degrees
	inverse(number) {
		/**
		 * @param {Number} number - expected radian
		 * @returns {Number} number in degrees
		 */
		return Number(number) * (180 / Math.PI);
	}

	// method to check precedence of operators on the stack
	_priorityCheck(stack, op) {
		return this.operands[stack[stack.length - 1]] >= this.operands[op];
	}

	// method to get numbers from input string
	_getNum(input, inc) {
		if (input[inc] === "." || input[inc] === "0");
		else if (!Number(input[inc])) return "";
		return input[inc] + this._getNum(input, inc + 1);
	}

	// Method to get words from input string
	_getWord(input, inc) {
		if (input[inc] == "-" || input[inc] == "1");
		else if (!/[a-z]/.test(input[inc])) return "";
		return input[inc] + this._getWord(input, inc + 1);
	}

	// Method to convert an infix expression to postfix
	toPostFix(input, degreeMode = false) {
		/**
		 *@param {String} input - Input infix expression
		 */

		//Wrapping the input string in parenthesis for easier parsing
		input = "(" + input + ")";

		for (let i = 0; i < input.length; i++) {
			if (input[i] === "(") this.stack.push(input[i]);
			else if (input[i] === ")") {
				while (this.stack[this.stack.length - 1] !== "(") {
					this.postFixExp.push(this.stack.pop());
				}
				this.stack.pop();
			} else if (this.constants[input[i]] !== undefined)
				this.postFixExp.push(this.constants[input[i]]);
			else if (this.operands[input[i]] !== undefined) {
				while (this._priorityCheck(this.stack, input[i]))
					this.postFixExp.push(this.stack.pop());
				this.stack.push(input[i]);
			} else if (/[a-z]/.test(input[i])) {
				const word = this._getWord(input, i);
				i += word.length - 1;
				if (word !== "") this.stack.push(word + "(");
			} else {
				let num = this._getNum(input, i);
				i += num.length - 1;
				if (degreeMode === true) num = this.toDeg(num);
				if (num !== "") this.postFixExp.push(num);
			}
		}
	}

	// method to evaluate a postfix expression
	evaluate(input, degreeMode = false) {
		/**
		 * Evaluates a postfix expression.
		 *
		 * @returns {Number} the total after evaluation
		 */
		this.toPostFix(input, degreeMode);

		for (let i = 0; i < this.postFixExp.length; i++) {
			if (this.operands[this.postFixExp[i]] === undefined)
				this.stack.push(this.postFixExp[i]);
			else {
				let [op2, op1] = [this.stack.pop(), ""];
				if (this.operands[this.postFixExp[i]] > 1) {
					op1 = this.postFixExp[i];
				} else op1 = this.stack.pop();

				if (op1 === undefined) op1 = "−";
				this.stack.push(this.operations[this.postFixExp[i]](op1, op2));
			}
		}
		return this.stack.pop();
	}
}

/*Locale Testing code

const ex = new ArithmeticExpression(operations);
console.log(ex.evaluate("sin-1(0.5)", true));
module.exports = ArithmeticExpression;

*/
