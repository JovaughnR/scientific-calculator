// const operations = require("./operation");

export class ArithmeticExpression {
	constructor() {
		this.operands = {
			"+": 0,
			"-": 0,
			"*": 1,
			"/": 1,
			"^": 2,
			"%": 2,
			"√": 2,
			"!": 2,
			e: 2,
			"𝜋": 2,
		};
	}

	_priorityCheck(stack, op) {
		return this.operands[stack[stack.length - 1]] >= this.operands[op];
	}

	_getNum(input, inc) {
		if (input[inc] === "." || input[inc] === "0");
		else if (!Number(input[inc])) return "";
		return input[inc] + this._getNum(input, inc + 1);
	}

	_emptyStack(stack, another) {
		while (stack.length) another.push(stack.pop());
	}

	toPostFix(input = new String()) {
		const stack = [];
		const postFixExp = [];
		input = "(" + input + ")";

		for (let i = 0; i < input.length; i++) {
			if (input[i] === "(") stack.push(input[i]);
			else if (input[i] === ")") {
				while (stack[stack.length - 1] !== "(") {
					postFixExp.push(stack.pop());
				}
				stack.pop();
			} else if (this.operands[input[i]] !== undefined) {
				while (this._priorityCheck(stack, input[i])) {
					postFixExp.push(stack.pop());
				}
				stack.push(input[i]);
			} else {
				const num = this._getNum(input, i);
				i += num.length - 1;
				if (num !== "") postFixExp.push(num);
			}
		}

		this._emptyStack(stack, postFixExp);
		return postFixExp;
	}

	evaluate(exp, operation) {
		const stack = [];
		for (let i = 0; i < exp.length; i++) {
			if (this.operands[exp[i]] === undefined) {
				stack.push(exp[i]);
				continue;
			}

			let [op2, op1] = [stack.pop(), stack.pop()];
			if (op1 === undefined) op1 = exp[i];
			stack.push(operation[exp[i]](op1, op2));
		}
		return stack.pop();
	}
}

// module.exports = ArithmeticExpression;
// const expression = new ArithmeticExpression();
// const postFix = expression.toPostFix("3^3");
// let total = expression.evaluateExpression(postFix, operations);
// console.log(total);
// console.log(-2.0 * 1.04);
