let board = {
    name: 'Tablica Kanban',
    addColumn: function(column) {
      this.element.appendChild(column.element);
      initSortable(column.id);
    },
    element: document.querySelector('#board .column-container')
};

function initSortable(id) {
    var el = document.getElementById(id);
    var sortable = Sortable.create(el, {
        group: 'kanban',
        sort: true
    });
}

document.querySelector("#board .create-column").addEventListener("click", function() {
    let name = prompt("Enter a column name");
    if (name === null) {
        return;
    }
    let data = new FormData();
    data.append("name", name || noName);

    fetch(prefix + baseUrl + "/column", {
        method: "POST",
        headers: myHeaders,
        body: data
    })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(resp) {
            let column = new Column(resp.id, name);
            board.addColumn(column);
        });
});
