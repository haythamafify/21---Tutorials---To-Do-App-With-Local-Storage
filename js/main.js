let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksdiv = document.querySelector(".tasks");


let arrayOfTasks = [];


if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}


getDataFromlocakStorage();
submit.onclick = function () {
  if (input.value !== "") {
    addTasktoarray(input.value);
    input.value = "";
  }
};
// task div click
tasksdiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskwith(e.target.parentElement.getAttribute("data-id"));

    e.target.parentElement.remove();
    // document.body.
  }

  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    taskStatusDone(e.target.getAttribute("data-id"));
  }
});

function addTasktoarray(tasktext) {
  const taskData = {
    id: Date.now(),
    title: tasktext,
    completed: false,
  };
  arrayOfTasks.push(taskData);
  addElementstoPageFrom(arrayOfTasks);
  addtasksTolocalStoragefrom(arrayOfTasks);
}
function addElementstoPageFrom(arrayOfTasks) {
  tasksdiv.innerHTML = "";
  // add div and span
  arrayOfTasks.forEach((element) => {
    let div = document.createElement("div");
    div.className = "task";
    if (element.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", element.id);
    div.appendChild(document.createTextNode(element.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));
    div.appendChild(span);
    tasksdiv.appendChild(div);
  });
}
function addtasksTolocalStoragefrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromlocakStorage() {
  let data = window.localStorage.getItem("tasks");

  if (data) {
    let task = JSON.parse(data);
    addElementstoPageFrom(task);
  }
}
function deleteTaskwith(taskid) {
  arrayOfTasks = arrayOfTasks.filter((element) => element.id != taskid);
  addtasksTolocalStoragefrom(arrayOfTasks);
}
function taskStatusDone(taskid) {
  for (let index = 0; index < arrayOfTasks.length; index++) {
    if (arrayOfTasks[index].id == taskid) {
      arrayOfTasks[index].completed == false
        ? (arrayOfTasks[index].completed = true)
        : (arrayOfTasks[index].completed = false);
    }
  }
  addtasksTolocalStoragefrom(arrayOfTasks);
}
let btndelete = document.querySelector(".btn-delete");
btndelete.onclick = function () {
  tasksdiv.innerHTML = "";
  window.localStorage.removeItem("tasks")
};
