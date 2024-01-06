// add item
function addItem() {
    tit = document.getElementById("title").value
    desc = document.getElementById("description").value
    if (localStorage.getItem("itemsJson") == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArraystr = localStorage.getItem("itemsJson")
        itemJsonArray = JSON.parse(itemJsonArraystr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray))
    }
    showRow()
}

// show table in frontend
function showRow() {
    itemJsonArraystr = localStorage.getItem("itemsJson")
    itemJsonArray = JSON.parse(itemJsonArraystr);
    var tablebody = document.getElementById("tableBody");
    if (itemJsonArray !== null && itemJsonArray.length > 0) {
        var str = "";
        itemJsonArray.forEach((element, index) => {
            str += `                    
            <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-sm btn-danger" onclick="deleteItem(${index})">Delete</button></td>
        </tr>
      `
        });
        tablebody.innerHTML = str;
    }
    else {
        var str = `
        <tr>
            <td colspan="4" class='text-center h2 my-4'>Your List is Empty.</td>
        </tr>`
        tablebody.innerHTML = str
    }
}

// click add to list button
document.addEventListener("DOMContentLoaded", function () {
    showRow();
    var add = document.getElementById("add");
    add.addEventListener("click", function () {
        var tit = document.getElementById("title").value;
        var desc = document.getElementById("description").value;
        if (tit.trim() !== "" && desc.trim() !== "") {
            addItem();
        } else {
            alert("Please enter some value.");
        }
    });
});

// delete one item from list
function deleteItem(item) {
    itemJsonArraystr = localStorage.getItem("itemsJson")
    itemJsonArray = JSON.parse(itemJsonArraystr);
    itemJsonArray.splice(item, 1)
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray))
    showRow();
}

// delete the complete list
function allClear() {
    if (confirm("Do You Want To Clear The Complete List?")) {
        localStorage.clear();
        showRow();
    }
}