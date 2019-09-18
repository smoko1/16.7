function Column(id, name) {
	let self = this;

	this.id = id;
	this.name = name || noName;
	this.element = generateTemplate("column-template", { name: this.name, id: this.id });

	this.element.querySelector(".column").addEventListener("click", function (event) {
		if (event.target.classList.contains("btn-delete")) {
			self.removeColumn();
		}

		if (event.target.classList.contains("add-card")) {
			let cardName = prompt("Enter the name of the card");
			if (cardName === null) {
				return;
			}
			event.preventDefault();
			let data = new FormData();
			data.append("name", cardName || noName);
			data.append("bootcamp_kanban_column_id", self.id);
			fetch(prefix + baseUrl + "/card", {
				method: "POST",
				headers: myHeaders,
				body: data
			})
				.then(function (res) {
					return res.json();
				})
				.then(function (resp) {
					let card = new Card(resp.id, cardName);
					self.addCard(card);
				});
		}
	});
}

Column.prototype = {
	addCard: function (card) {
		this.element.querySelector("ul").appendChild(card.element);
	},
	removeColumn: function () {
		let self = this;
		fetch(prefix + baseUrl + "/column/" + self.id, { method: "DELETE", headers: myHeaders })
			.then(function (resp) {
				return resp.json();
			})
			.then(function (resp) {
				self.element.parentNode.removeChild(self.element);
			});
	}
};
