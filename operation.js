import { createElement } from "./index.js";

const infoParaEl = document.querySelector("#info-para");
const divisionButtonEl = document.querySelector("#divisible_check");
const inputEl = document.querySelector("#dividend");
const infoSectionEl = document.querySelector(".info-section");
const rulesEl = document.querySelector(".rules");

const svgObj = {
	width: "49",
	height: "22",
	viewBox: "0 0 49 22",
	fill: "none",
	definition:
		"M47.5663 9.57258C41.0664 18.0723 37.1385 20.0723 30.0664 20.0723C13.3781 20.0723 8.48229 10.763 6.78678 8.67796M4.57295 1.92525L13.7944 4.41839C9.27402 9.6396 0.587717 18.6108 2.00524 12.726C3.42277 6.84125 4.13777 4.43735 4.31808 3.97099",
	stroke: {
		color: "#0DDEED",
		width: "2.5",
		lineCap: "round",
		lineJoin: "round",
	},
};

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

function generateRule(number, dividend) {
	const ruleItemEl = createElement("div", undefined, [
		"rule-item",
		numberToWords(number),
	]);

	//Heading
	const ruleHeadingEl = ruleHeading(number);
	ruleItemEl.appendChild(ruleHeadingEl);

	// Breakdown
	if (number !== 1) {
		const breakdownEl = createBreakdown(number, dividend);
		ruleItemEl.appendChild(breakdownEl);
	}

	// Para
	const paraEl = createElement("p", rulesExplain[number - 2], []);
	ruleItemEl.appendChild(paraEl);

	return ruleItemEl;
}

const rulesExplain = [
	"If the last digit (the unit digit) is even, it is divisible by 2.",
	"If the addition of each digit is divisible by 3, then, it is divisible by 3.",
	"If the last 2 digits together (the hundredth and unit digit) can be divided by 2 twice, it is divisible by 4.",
	"If the unit digit is 0 or 5, it is divisible by 5.",
	"If the number is divisible by both 2 and 3, it is divisible by 6.",
	"Take the last digit, double it. Subtract the number from the remaining digit, if the answer is divisible by 7 or is 0, it's divisible by 7.",
	"If you take the last 3 digits of the number and can divide it by 2 three times, it is divisible by 8.",
	"If the addition of each digit is divisible by 9, then, it is divisible by 9.",
	"If the unit digit is 0, it is divisible by 5.",
];

function generateHelperDetails(element, divisor, arr, svgObj) {
	const wrapperEl = createElement(
		"span",
		undefined,
		["box-details-wrapper"],
		undefined,
		undefined
	);

	arr.forEach((number) => {
		const detailEl = createElement(
			"span",
			undefined,
			["box-details"],
			undefined,
			undefined
		);

		const svgEl = createSVG(svgObj);
		const content = `divisible by ${divisor} (${number})`;
		const textEl = createElement(
			"span",
			content,
			["text"],
			undefined,
			undefined
		);

		detailEl.appendChild(svgEl);
		detailEl.appendChild(textEl);
		wrapperEl.appendChild(detailEl);
	});

	element.appendChild(wrapperEl);
}

function createSVG(prop) {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

	svg.setAttribute("width", prop.width);
	svg.setAttribute("height", prop.height);
	svg.setAttribute("viewbox", prop.viewBox);
	svg.setAttribute("fill", prop.fill);

	svg.setAttributeNS(
		"http://www.w3.org/2000/xmlns/",
		"xmlns:xlink",
		"http://www.w3.org/1999/xlink"
	);

	path.setAttribute("d", prop.definition);

	if (prop.stroke !== undefined) {
		path.setAttribute("stroke", prop.stroke.color);
		path.setAttribute("stroke-width", prop.stroke.width);
		path.setAttribute("stroke-linecap", prop.stroke.lineCap);
		path.setAttribute("stroke-linejoin", prop.stroke.lineJoin);
	}

	svg.appendChild(path);

	return svg;
}

function ruleHeading(number) {
	if (number >= 1 && number <= 10) {
		const headingEl = createElement("h3", "Divisible by", []);
		const numberSpanEl = createElement("span", number, ["number", "small"], {
			name: "number",
			value: numberToWords(number),
		});
		headingEl.appendChild(numberSpanEl);

		return headingEl;
	}
}

function createBreakdown(number, dividend) {
	if (number >= 2 && number <= 10) {
		const breakdownEl = createElement("div", undefined, ["breakdown"]);
		const paraHolderEl = createElement("p", undefined, []);

		switch (number) {
			case 2:
				const input = dividend[dividend.length - 1];
				const divisions = numerousDivision(input, 2, 1);
				const boxInputEl = createElement("span", input, ["box-input"]);
				generateHelperDetails(boxInputEl, 2, divisions, svgObj);
				paraHolderEl.append(boxInputEl);

				break;

			default:
				break;
		}

		breakdownEl.appendChild(paraHolderEl);

		return breakdownEl;
	}
	return "";
}

function numerousDivision(dividend, divisor, occurence) {
	const divisions = [];

	let previousDividend = dividend;

	for (let index = 0; index < occurence; index++) {
		previousDividend = previousDividend / divisor;
		divisions.push(previousDividend);
	}

	return divisions;
}

console.log(numerousDivision(0, 2, 1));

// Testing
// const boxInput = document.querySelector(".box-input");
// generateHelperDetails(boxInput, 2, [4, 5, 4], svgObj);

// const para = createElement("p", rulesExplain[10 - 2], []);
// document.body.appendChild(para);

// const heading = ruleHeading(10);
// document.body.appendChild(heading);
// console.log(createBreakdown(1));

// const rule = document.querySelector(".rule-item");
// const breakdown = createBreakdown(2, "3420");
// rule.appendChild(breakdown);

const ruleContainerEl = document.querySelector(".rule-container");
const ruleItemEl = generateRule(2, "3240");
ruleContainerEl.appendChild(ruleItemEl);
