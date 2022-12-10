let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let btn = document.getElementById("btn");

let arrayOfTasks = [];
if (localStorage.getItem("task")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("task"));
}
getDataFromLocalStorage();
//how to delete with e and target  so important ################
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        //remove task from the page
        e.target.parentElement.remove();
        //remove from the local storage
        removeElementBy(e.target.parentElement.getAttribute("data-id"));
    }
    if (e.target.classList.contains("task")) {
        e.target.classList.toggle("done");
        toggleComplete(e.target.getAttribute("data-id"));
    }
});

btn.onclick = function () {
    localStorage.clear();
    arrayOfTasks.splice(0);
    setTasksInTaskbar(arrayOfTasks);
};

//how to delete with e and target  so important ################

submit.onclick = function () {
    if (input.value !== "") {
        let task = {
            id: Date.now(),
            title: input.value,
            completed: false,
        };
        arrayOfTasks.push(task);
        addDataToLocalStorage(arrayOfTasks);
        setTasksInTaskbar(arrayOfTasks);
    }
    input.value = "";
};

function addDataToLocalStorage(arrayOfTasks) {
    localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

function setTasksInTaskbar(arrayOfTasks) {
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach((e) => {
        let div = document.createElement("div");
        let divContent = document.createTextNode(e.title);
        let span = document.createElement("span");
        let spanContent = document.createTextNode("delete");
        div.appendChild(divContent);
        span.appendChild(spanContent);
        div.appendChild(span);
        span.className = "del";
        div.className = "task";
        if (e.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", e.id);
        tasksDiv.appendChild(div);
    });
}
function getDataFromLocalStorage() {
    let data = localStorage.getItem("task");
    if (data) {
        let tasks = JSON.parse(data);
        setTasksInTaskbar(tasks);
    }
}
function removeElementBy(taskId) {
    arrayOfTasks = arrayOfTasks.filter((ele) => {
        return ele.id != taskId;
    });
    addDataToLocalStorage(arrayOfTasks);
}
function toggleComplete(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false
                ? (arrayOfTasks[i].completed = true)
                : (arrayOfTasks[i].completed = false);
        }
    }
    addDataToLocalStorage(arrayOfTasks);
}
