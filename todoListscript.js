const push = document.querySelector("#push");
const newTaskInput = document.querySelector("#newtask input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

// Function to create a task element in the DOM
const createTaskElement = (taskName, isCompleted = false) => {
    const taskHTML = `<div class="task"> 
        <input type="checkbox" class="task-check" ${isCompleted ? "checked" : ""}> 
        <span class="taskname ${isCompleted ? "completed" : ""}">${taskName}</span> 
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button> 
        <button class="delete"><i class="fa-solid fa-trash"></i></button> 
    </div>`;
    
    tasksContainer.insertAdjacentHTML("beforeend", taskHTML);
    updateTaskListeners();
};

// Load tasks from localStorage
const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => createTaskElement(task.name, task.completed));
    taskCount = savedTasks.length;
    displayCount(taskCount);
};

// Save tasks to localStorage
const saveTasks = () => {
    const tasks = Array.from(document.querySelectorAll(".task")).map(taskElement => ({
        name: taskElement.querySelector(".taskname").innerText,
        completed: taskElement.querySelector(".task-check").checked
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Add a new task
const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";

    if (!taskName) {
        setTimeout(() => { error.style.display = "block"; }, 200);
        return;
    }

    createTaskElement(taskName);
    taskCount += 1;
    displayCount(taskCount);
    saveTasks(); // Save the new task list
    newTaskInput.value = "";
};

// Update event listeners for tasks
const updateTaskListeners = () => {
    const deleteButtons = document.querySelectorAll(".delete");
    const editButtons = document.querySelectorAll(".edit");
    const tasksCheck = document.querySelectorAll(".task-check");

    deleteButtons.forEach(button => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
            saveTasks();
        };
    });

    editButtons.forEach(editBtn => {
        editBtn.onclick = (e) => {
            const targetElement = e.target.closest(".task").querySelector(".taskname");
            newTaskInput.value = targetElement.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
            saveTasks();
        };
    });

    tasksCheck.forEach(checkBox => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed", checkBox.checked);
            if (checkBox.checked) {
                taskCount -= 1;
            } else {
                taskCount += 1;
            }
            displayCount(taskCount);
            saveTasks();
        };
    });
};

push.addEventListener("click", addTask);

// Load tasks on page load
window.onload = () => {
    loadTasks();
};



  // nav bar responsiveness
        function toggleMenu() {
        const nav = document.querySelector('nav');
        nav.classList.toggle('active');
        document.querySelector('.menu-icon').style.display = nav.classList.contains('active') ? 'none' : 'block';
        document.querySelector('.close-icon').style.display = nav.classList.contains('active') ? 'block' : 'none';
    }