import { createElement } from "./index.js";

const infoParaEl = document.querySelector("#info-para");
const divisionButtonEl = document.querySelector("#divisible_check");
const inputEl = document.querySelector("#dividend");
const infoSectionEl = document.querySelector(".info-section");
const rulesEl = document.querySelector(".rules");

divisionButtonEl.addEventListener("click", () => {
	if (inputEl.value !== "") {
		infoSectionEl.dataset.open = "true";
		rulesEl.dataset.open = "true";

		infoParaEl.textContent = "This number is divisible by ";

		const dividend = inputEl.value;
		const digitDivisors = generateDivisors(dividend);
		const divisorCount = updateDivisorCount(digitDivisors);
		const divisorHolderEl = createElement(
			"span",
			divisorCount,
			[],
			undefined,
			"number-divisor"
		);
		infoParaEl.appendChild(divisorHolderEl);

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

function generateRules(digitDivisors) {
	createRuleItem();
	createBreakdown(number);
}
