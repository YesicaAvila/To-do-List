const input = document.querySelector(".input-text");
const addForm = document.querySelector(".add-form");
const taskList = document.querySelector(".task-list");
const deleteBtn = document.querySelector(".deleteAll-btn");
const emptyImg = document.querySelector(".img-empty");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveLocalStorage = (taskList) => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
};

const createTask = (task) => {
    return `<li>${task.name}<img class="delete-btn" src="./img/delete.png" alt="boton de borrar" data-name="${task.name}"></li>`;
};

const renderTaskList = (todoList) => {
    taskList.innerHTML = todoList.map((task) =>
        createTask(task)).join("");
};

const hideDeleteAll = (tasksList) => {

    if(!tasksList.length) {
        deleteBtn.classList.add("hidden");
        return;
    }
    deleteBtn.classList.remove("hidden");
};

const hideImgLazy = () => {
    if (tasks.length === 0) {
        emptyImg.classList.remove("hidden");
    } else {
        emptyImg.classList.add("hidden");
    }
};

const addTask = (e) => {
    e.preventDefault();
    const taskName = input.value.trim().replace(/\s+/g, " ");
    if (!taskName.length) {
        alert("Por favor ingrese una tarea");
        return
    } else if (
        tasks.some((task) => {
            return task.name.toLowerCase() === taskName.toLowerCase();
        })
    ) {
        alert("Ya existe una tarea con ese nombre");
        return
    }

    tasks = [ ...tasks, {name: taskName}]
    input.value = "";
    renderTaskList(tasks);
    saveLocalStorage(tasks);
    hideDeleteAll(tasks);
    hideImgLazy();
};

const removeTask = (e) => {
    if (!e.target.classList.contains("delete-btn")) {
        return;
    }
    const filterName = e.target.dataset.name;
    tasks = tasks.filter((task) => task.name !== filterName);
    renderTaskList(tasks);
    saveLocalStorage(tasks);
    hideDeleteAll(tasks);
    hideImgLazy();
};

const removeAll = () => {
    tasks = [];
    renderTaskList(tasks);
    saveLocalStorage(tasks);
    hideDeleteAll(tasks);
    hideImgLazy();
};

const init = () => {
    renderTaskList(tasks);
    addForm.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    deleteBtn.addEventListener("click", removeAll);
    hideDeleteAll(tasks);
    hideImgLazy();
};

init();

