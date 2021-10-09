var btn = document.getElementById("add-btn");
var draggedList = document.getElementsByClassName('item');
var containerList = document.getElementsByClassName('tasksSection');

btn.addEventListener("click", function(e) {
    e.preventDefault();

    var text = document.getElementById("textVal").value;
    if (!text) {
        alert("Enter a valid input");
        return;
    }

    var item = document.createElement('li');
    item.innerHTML = `${text}`;
    item.id = `${text}`;
    item.className = "item";
    item.draggable = "true";
    setStrorageData(item.innerText, "progress-list");

    item.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text', this.id);
    })

    var list = document.getElementById("progress-list");
    list.append(item);
})

for (var i = 0; containerList.length > i; i++) {
    containerList[i].addEventListener('dragover', function(e) { e.preventDefault(); });
    containerList[i].addEventListener('drop', dropFun);
}

function dropFun(event) {
    var darggedData = event.dataTransfer.getData('text');
    this.appendChild(document.getElementById(darggedData));
    setStrorageData(document.getElementById(darggedData).innerText, this.id);
}

function setStrorageData(value, list) { localStorage.setItem(value, list) }

document.onload = getfromStorage();

function getfromStorage() {
    for (var i = 0; localStorage.length > i; i++) {
        var value = Object.keys(localStorage)[i];
        var listName = localStorage.getItem(value);

        var item = document.createElement('li');
        item.innerHTML = `${value}`;
        item.id = `${value}`;
        item.className = "item";
        item.draggable = "true";

        document.getElementById(listName).append(item);
    }
}