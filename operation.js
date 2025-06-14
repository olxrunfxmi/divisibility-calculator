import { createElement } from "./index.js";

const infoParaEl = document.querySelector("#info-para");
const divisorHolderEl = infoParaEl.querySelector("#number-divisor");
const divisionButtonEl = document.querySelector("#divisible_check");
const inputEl = document.querySelector("#dividend");

divisionButtonEl.addEventListener("click", () => {
	if (inputEl.value !== "") {
		const dividend = inputEl.value;

		const digitDivisors = generateDivisors(dividend);
		divisorHolderEl.textContent = updateDivisorCount(digitDivisors);
		addNumberKeys(infoParaEl, digitDivisors);
	}
});

function generateDivisors(dividend) {
	const digitDivisors = [];

	for (let index = 1; index <= 10; index++) {
		if (dividend % index === 0) {
			digitDivisors.push(index);
		}
	}

	return digitDivisors;
}

function addNumberKeys(element, digitDivisors) {
	digitDivisors.forEach((divisor) => {
		const numberKey = createElement("span", divisor, ["number"], {
			name: "number",
			value: numberToWords(divisor),
		});
		element.appendChild(numberKey);
	});
}

function updateDivisorCount(digitDivisors) {
	const count = digitDivisors.length;
	const text = count > 1 ? "nos" : "no";

	return `${count} ${text}`;
}

console.log(updateDivisorCount([1, 7]));

function generateRules(digitDivisors) {
	createRuleItem();
	createBreakdown(number);
}

function numberToWords(num) {
	const words = [
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
		"ten",
	];

	if (num >= 1 && num <= 10) {
		return words[num - 1];
	}
}