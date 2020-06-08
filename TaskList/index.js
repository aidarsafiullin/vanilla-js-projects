//Define UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

let tasks;

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);

}

// Add task func
function addTask(e) {
    if (taskInput.value === '') {
        alert('add a task!')
    }

    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // Create text node and appent to li
    li.appendChild(document.createTextNode(taskInput.value));
    
    // Create new link element
    const link = document.createElement('a');

    // Add class to link
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"><i/>';

    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // store in LS
    storeTaskInLocalStorage(taskInput.value);

    
    // Clear input after add
    taskInput.value = '';

    //cancel default prevent
    e.preventDefault();
}

// Store Task func
function storeTaskInLocalStorage(task) {
    lsRequest();

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get Tasks from LS
function getTasks() {
    
    lsRequest();

    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and appent to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class to link
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"><i/>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    })
}

// filterTasks func
function filterTasks(e) {
     
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// removeTask func
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Вы уверены?'))
            e.target.parentElement.parentElement.remove();

            //remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    lsRequest();
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        } 
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function lsRequest() {
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
        return tasks;
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        return tasks;
    }
}

// clearTasks func
function clearTasks(e) {
    // taskList.innerHTML = '';
    //faster

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear all tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}