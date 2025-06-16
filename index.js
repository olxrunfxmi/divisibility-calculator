const tableEl = document.querySelector(".table");
const tableButtonEl = document.querySelector("#table-button");

createMultiplyTable(10);

tableButtonEl.addEventListener("click", (e) => {
	tableEl.dataset.open = tableEl.dataset.open === "true" ? "false" : "true";
});

function createMultiplyTable(num) {
	const startNum = 1;
	const endNum = num;

	for (let index = startNum; index <= endNum; index++) {
		const startEl = createElement("div", index, ["table-item"]);
		tableEl.appendChild(startEl);

		for (let innerIndex = 1; innerIndex <= endNum; innerIndex++) {
			const numberEl = createElement(
				"div",
				index * innerIndex,
				["table-item"],
				{
					name: "info",
					value: `${index} x ${innerIndex} = ${index * innerIndex}`,
				}
			);
			tableEl.appendChild(numberEl);
		}
	}
}

function createElement(elementType, textContent, classArr, data, id) {
	const element = document.createElement(elementType);

	if (textContent !== undefined) {
		element.textContent = textContent;
	}

	element.classList.add(...classArr);

	if (data !== undefined) {
		element.dataset[data.name] = data.value;
	}

	if (id !== undefined) {
		element.id = id;
	}

	return element;
}

export { createElement };
