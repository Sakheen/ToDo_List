const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskList2 = document.getElementById("task-list2");

const usernameDisplay = document.getElementById("usernameDisplay");

const userEmail = JSON.parse(localStorage.getItem("UserPresent"));

const tasksData = JSON.parse(localStorage.getItem("tasksData")) || {};

if (userEmail) 
{
    usernameDisplay.textContent = "Hello, " + userEmail.email + "   !";
} 
else 
{
    usernameDisplay.textContent = "No user email found.";
}

if (tasksData[userEmail.email]) 
{
    tasksData[userEmail.email].forEach(task => { // ForEach is used to iterate in array
        addTaskToList(task);
    });
}

taskForm.addEventListener("submit", function (e) { // when submit is clicked then function is performed
    e.preventDefault();     // to prevent default behaviour associated with event
    const taskText = taskInput.value.trim(); // function is used to remove initial spaces  like you cannot add space as task  

    if (taskText !== "")
    {
        if (!tasksData[userEmail.email]) 
        {
            tasksData[userEmail.email] = [];
        }

        tasksData[userEmail.email].push(taskText);
        updateLocalStorage();

        addTaskToList(taskText);
        taskInput.value = "";
    }
});

function updateLocalStorage() 
{
    localStorage.setItem("tasksData", JSON.stringify(tasksData)); // it converts stings into JSOn format & saves to local storage
}

// function addTaskToList(taskText) {
//     const taskItem = document.createElement("div");
//     taskItem.classList.add("task");
//     taskItem.innerHTML = `
//         <input type="text" value="${taskText}" readonly>
//         <button class="edit">Edit</button>
//         <button class="delete">Delete</button>
//     `;

//     taskItem.querySelector(".edit").addEventListener("click", function () {
//         const editText = prompt("Edit task:", taskText);
//         if (editText !== null) {
//             taskItem.querySelector("input").value = editText;
//             tasksData[userEmail.email][tasksData[userEmail.email].indexOf(taskText)] = editText;
//             updateLocalStorage();
//         }
//     });

//     taskItem.querySelector(".delete").addEventListener("click", function () {
//         taskList.removeChild(taskItem);
//         tasksData[userEmail.email] = tasksData[userEmail.email].filter(task => task !== taskText);
//         updateLocalStorage();
//     });

//     taskList.appendChild(taskItem);

//     taskItem.querySelector(".delete").addEventListener("click", function () {
//         taskList2.removeChild(taskItem);
//         tasksData[userEmail.email] != tasksData[userEmail.email].filter(task => task !== taskText);
//         updateLocalStorage();
//     });

//     taskList2.appendChild(taskItem);
// }

function addTaskToList(taskText) 
{
    const taskList = document.getElementById("task-list"); // Get the task list container by ID

    const taskItem = document.createElement("div"); // create new div for each tasks
    taskItem.classList.add("task"); // when new div is made then its css class is set to "task"
    taskItem.innerHTML = `
        <input type="text" value="${taskText}" readonly>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;

    taskItem.querySelector(".edit").addEventListener("click", function () { //It allows you to target elements based on their tag names, classes, IDs
        const editText = prompt("Edit task:", taskText);
        if (editText !== null) 
        {
            taskItem.querySelector("input").value = editText;
            tasksData[userEmail.email][tasksData[userEmail.email].indexOf(taskText)] = editText;
            updateLocalStorage();
        }
    });

    taskItem.querySelector(".delete").addEventListener("click", function () {
        taskList.removeChild(taskItem);
        tasksData[userEmail.email] = tasksData[userEmail.email].filter(task => task !== taskText);
        updateLocalStorage();
    });

    taskList.appendChild(taskItem);     // Append the task item to the task list container

}



function logout() 
{
    localStorage.removeItem('UserPresent');
    localStorage.removeItem('email');
    window.location.href = "login.html";
}

//queryselectorall