let taskList = [];
let taskListText = [];

function addTask() {
    let txtTask = document.getElementById("txtTask").value;
    
    if (txtTask === "") return; // Prevent adding empty tasks

    taskListText.push(txtTask);
    taskList.push(`<li class="list-group-item">
                       <input class="form-check-input me-1" type="checkbox" value="" id="${txtTask}">
                       <label class="form-check-label stretched-link" for="${txtTask}">${txtTask}</label>
                     </li>`);

    loadTasks();
    clearTxt();
    console.log(taskList);
}

function loadTasks() {
    let listBody = "";
    
    taskList.forEach(task => {
        listBody += task;
    });
    document.getElementById("uList").innerHTML = listBody;

    // Add event listeners to checkboxes after loading tasks
    taskListText.forEach(task => {
        const checkbox = document.getElementById(task);
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                moveToDone(task);
            }
        });
    });
}

function moveToDone(task) {
    // Remove task from the taskList and taskListText
    taskListText = taskListText.filter(t => t !== task);
    taskList = taskList.filter(t => !t.includes(task)); // Filter out the task from taskList

    // Add the task to the Done list
    const doneTask = `<li class="list-group-item">${task}</li>`;
    document.getElementById("uListDone").innerHTML += doneTask;

    // Reload the remaining tasks
    loadTasks();
}

function clearTxt() {
    document.getElementById("txtTask").value = '';
}