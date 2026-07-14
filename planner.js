const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const taskError = document.getElementById("taskError");

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (taskName.value == "" || taskDate.value == "") {
        taskError.innerHTML = "Please fill in all fields.";
        taskError.style.color = "red";
        return;
    }

    taskError.innerHTML = "";

    let li = document.createElement("li");

    li.innerHTML =
    taskName.value +
    " - " +
    taskDate.value +
    " <button onclick='completeTask(this)'>Done</button> " +
    "<button onclick='deleteTask(this)'>Delete</button>";

    taskList.appendChild(li);

    taskName.value = "";
    taskDate.value = "";
});

function deleteTask(button) {
    button.parentElement.remove();
}

function completeTask(button) {
    button.parentElement.style.textDecoration = "line-through";
    button.parentElement.style.color = "green";
}

function showMessage() {
    document.getElementById("message").innerHTML =
        "Keep studying every day. Success comes through consistency!";
}