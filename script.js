let tasks = [
    { id: 1, title: 'Finish CS 212 project', description: 'Build the task manager for phase 1', dueDate: '2026-07-26', priority: 'High', completed: false },
    { id: 2, title: 'Study for MAT 121 exam', description: 'Practice problems from chapter 8', dueDate: '2026-07-28', priority: 'High', completed: false },
    { id: 3, title: 'Buy running shoes', description: '', dueDate: '2026-08-03', priority: 'Medium', completed: false },
    { id: 4, title: 'Submit quiz 3', description: 'Untimed quiz, unlimited attempts', dueDate: '2026-08-02', priority: 'Low', completed: true },
    { id: 5, title: 'Email advisor', description: 'Ask about fall registration', dueDate: '2026-07-20', priority: 'Low', completed: true }
];


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved != null) {
        tasks = JSON.parse(saved);
    }
    else {
        console.log("NULL");
    }
}

function renderTasks() {
    let html = ''
    let completedCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        let doneClass = '';
        if (tasks[i].completed === true) {
            doneClass = ' done';
            completedCount++;
        }
        html += '<div class="col-md-6">' +
            '<div class="card h-100' + doneClass + '" id="card-' + tasks[i].id + '">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + tasks[i].title + '</h5>' +
            '<span class="badge bg-danger">' + tasks[i].priority + '</span>' +
            '<p class="card-text">' + tasks[i].description + '</p>' +
            '<p>Due: ' + tasks[i].dueDate + '</p>' +
            '<button class="btn btn-success" onclick="toggleComplete(' + tasks[i].id + ')">Done</button> ' +
            '<button class="btn btn-primary" onclick="editTask(' + tasks[i].id + ')">Edit</button> ' +
            '<button class="btn btn-danger" onclick="deleteTask(' + tasks[i].id + ')">Delete</button>' +
            '</div></div></div>';
    }
    document.getElementById('taskGrid').innerHTML = html;

    document.getElementById('statTotal').textContent = tasks.length;
    document.getElementById('statCompleted').textContent = completedCount;
    document.getElementById('statPending').textContent = tasks.length - completedCount;
    let percent = 0;
    if (tasks.length > 0) {
        percent = Math.round((completedCount / tasks.length) * 100);
    }
    document.getElementById('progressBar').style.width = percent + '%';
}


document.getElementById('addForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDesc').value;
    const dueDate = document.getElementById('taskDue').value;
    const priority = document.getElementById('taskPriority').value;
    if (title === '') { return; }
    tasks.push({
        id: Date.now(),
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        completed: false
    });
    saveTasks();
    renderTasks();
    document.getElementById('addForm').reset();
});

function toggleComplete(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].completed = !tasks[i].completed;
        }
    }
    saveTasks();
    renderTasks();
}


function deleteTask(id) {
    $('#card-' + id).fadeOut(400, function () {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                tasks.splice(i, 1);
                break;
            }
        }
        saveTasks();
        renderTasks();
    });
}

//from hw9
function editTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            const newTitle = prompt('Edit task:', tasks[i].title);
            if (newTitle === null || newTitle.trim() === '') { return; }
            tasks[i].title = newTitle.trim();
        }
    }
    saveTasks();
    renderTasks();
}


loadTasks();
renderTasks();