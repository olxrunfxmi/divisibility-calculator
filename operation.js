function generateDivisors(dividend) {
	const digitDivisors = [];

	for (let index = 1; index <= 10; index++) {
		if (dividend % index === 0) {
			digitDivisors.push(index);
		}
	}

	return digitDivisors;
}

function generateRules(digitDivisors) {
	createRuleItem();
	createBreakdown(number);
}
