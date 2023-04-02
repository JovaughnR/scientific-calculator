class Operations {
	static addition(operand1, operand2) {
		return Number(operand1) + Number(operand2);
	}

	static subtraction(operand1, operand2) {
		if (operand1 === "-") return Number(-operand2);
		return Number(operand1) - Number(operand2);
	}

	static division(operand1, operand2) {
		return Number(operand1) / Number(operand2);
	}

	static multiplication(operand1, operand2) {
		return Number(operand1) * Number(operand2);
	}

	static percentage(_, number) {
		return Number(number) / 100;
	}

	static exponent(number, exp = 2) {
		return Number(number) ** Number(exp);
	}

	static factorial(_, number) {
		number = Number(number);
		if (number < 2) return 1;
		return number * Operations.factorial(_, number - 1);
	}

	static sqrt(_, number) {
		if (Number(number) < 0) return number;
		return Math.sqrt(Number(number));
	}

	static pie() {
		return Math.PI;
	}

	static euler() {
		return Math.E;
	}
}

export const operations = {
	"+": Operations.addition,
	"*": Operations.multiplication,
	"-": Operations.subtraction,
	"/": Operations.division,
	"^": Operations.exponent,
	"%": Operations.percentage,
	"√": Operations.sqrt,
	"!": Operations.factorial,
	e: Operations.euler,
	"𝜋": Operations.pie,
};

// module.exports = operations;
