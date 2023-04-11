class Operations {
	static addition(operand1, operand2) {
		return Number(operand1) + Number(operand2);
	}

	static subtraction(operand1, operand2) {
		if (operand1 === "−") return Number(-operand2);
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

	static exponent(number, exp) {
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

	static naturalLog(_, number) {
		return Math.log(Number(number));
	}

	static log(_, number) {
		return Math.log10(Number(number));
	}

	static sin(_, number) {
		return Math.sin(Number(number));
	}

	static cos(_, number) {
		return Math.cos(Number(number));
	}

	static tan(_, number) {
		return Math.tan(Number(number));
	}

	static acos(_, number) {
		return Math.acos(Number(number));
	}

	static asin(_, number) {
		return Math.asin(Number(number));
	}
	static atan(_, number) {
		return Math.atan(Number(number));
	}
	static exp(_, number) {
		return Math.exp(Number(number));
	}
}

export const operations = {
	"+": Operations.addition,
	"×": Operations.multiplication,
	"−": Operations.subtraction,
	"÷": Operations.division,
	"^": Operations.exponent,
	"%": Operations.percentage,
	"√": Operations.sqrt,
	"!": Operations.factorial,
	"log(": Operations.log,
	"ln(": Operations.naturalLog,
	"sin(": Operations.sin,
	"cos(": Operations.cos,
	"tan(": Operations.tan,
	"cos-1(": Operations.acos,
	"sin-1(": Operations.asin,
	"tan-1(": Operations.atan,
	"exp(": Operations.exp,
};

// module.exports = operations;
