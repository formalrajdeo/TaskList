//Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all Event Listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
  //DOM load event - for displaying localStorage to UI
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task event
  form.addEventListener("submit", addTask);
  //Remove task event
  taskList.addEventListener("click", removeTask);
  //Clear task event
  clearBtn.addEventListener("click", clearTasks);
  //Filter Tasks event
  filter.addEventListener("keyup", filterTasks);
}

//Get Tasks from LocalStorage in UI
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    //Create li element
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement("a");
    //Add class
    link.className = "delete-item secondary-content";
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append to link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  });
}

//Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Bro plz Add a task");
  }

  //Create li element
  const li = document.createElement("li");
  //Add class
  li.className = "collection-item";
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link = document.createElement("a");
  //Add class
  link.className = "delete-item secondary-content";
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append to link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  //Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  //clear Input
  taskInput.value = "";

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    //Upar line mein icon ko target kiya
    if (confirm("Are you sure ?")) {
      e.target.parentElement.parentElement.remove(); //icon ke baap "<a>" ko target kiya

      //Remove from LocalStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from LocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear task
function clearTasks() {
  //taskList.innerHTML = ""; //1st way

  //2nd way:Faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //Clear from LocalStorage
  clearTasksFromLocalStorage();
}

//Clear tasks from LocalStorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks - Search karega
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  //Query selector - Node List hota hai, no conversion required, pehle se hi array jaisa hai
  //getElementById - Html collection hota hai string, usko convert karna
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
