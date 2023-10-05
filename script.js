let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
let tasks = JSON.parse(localStorage.getItem('dailyTasks')) || [];

function checkForEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitJournalEntry();
    }
}

function submitJournalEntry() {
    const entryText = document.getElementById('journalEntry').value;
    const category = document.getElementById('category').value;
    const currentDate = new Date();
    const timeString = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    if (entryText) {
        journalEntries.push({ text: entryText, category: category, time: timeString });
        localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
        document.getElementById('journalEntry').value = '';
        displayJournalEntries();
    }
}

function displayJournalEntries() {
    const entriesDiv = document.getElementById('previousEntries');
    entriesDiv.innerHTML = '';
    journalEntries.forEach((entry, index) => {
        entriesDiv.innerHTML += `
            <div class="entry">
                <span class="entry-date-time">[${entry.date} ${entry.time}]</span>
                <span class="entry-category">[${entry.category}]</span>
                <span class="entry-content">${entry.text}</span>
                <button onclick="deleteSpecificEntry(${index})">ลบ</button>
            </div>`;
    });
}



document.getElementById('togglePrevious').addEventListener('click', function () {
    const entriesDiv = document.getElementById('previousEntries');
    if (entriesDiv.style.display === 'none') {
        entriesDiv.style.display = 'block';
    } else {
        entriesDiv.style.display = 'none';
    }
});

function checkForEnterTask(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
}

function addTask() {
    const taskText = document.getElementById('newTask').value;
    const taskStart = document.getElementById('taskStart').value;
    const taskDeadline = document.getElementById('taskDeadline').value;
    if (taskText) {
        tasks.push({ text: taskText, start: taskStart, deadline: taskDeadline });
        localStorage.setItem('dailyTasks', JSON.stringify(tasks));
        document.getElementById('newTask').value = '';
        displayTasks();
    }
}

function displayTasks() {
    const taskListDiv = document.getElementById('taskList');
    taskListDiv.innerHTML = '';
    tasks.forEach((task, index) => {
        taskListDiv.innerHTML += `
            <li class="task-item">
                <span class="task-date">วันเริ่มต้น: ${task.start} | วันสิ้นสุด: ${task.deadline}</span>
                <span class="task-content">${task.text}</span>
                <button onclick="deleteTask(${index})">Delete</button>
            </li>`;
    });
}


function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('dailyTasks', JSON.stringify(tasks));
    displayTasks();
}

function loadTasksForDate() {
    const selectedDate = document.getElementById('calendarDate').value;
    const tasksForDateDiv = document.getElementById('tasksForDate');
    tasksForDateDiv.innerHTML = '';
    tasks.forEach((task) => {
        if (task.start === selectedDate || task.deadline === selectedDate) {
            tasksForDateDiv.innerHTML += `
                <li class="task-item">
                    <span class="task-date">วันเริ่มต้น: ${task.start} | วันสิ้นสุด: ${task.deadline}</span>
                    <span class="task-content">${task.text}</span>
                </li>`;
        }
    });
}

document.getElementById('submitEntry').addEventListener('click', submitJournalEntry);

function submitJournalEntry() {
    const entryText = document.getElementById('journalEntry').value;
    const category = document.getElementById('category').value;
    const currentDate = new Date();
    const timeString = `${formatTimeUnit(currentDate.getHours())}:${formatTimeUnit(currentDate.getMinutes())}`;
    const dateString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`; // Format: DD/MM/YYYY
    if (entryText) {
        journalEntries.push({ text: entryText, category: category, time: timeString, date: dateString });
        localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
        document.getElementById('journalEntry').value = '';
        displayJournalEntries();
    }
}

function deleteSpecificEntry(index) {
    journalEntries.splice(index, 1); // Remove the entry at the specified index
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries)); // Update local storage
    displayJournalEntries(); // Refresh the displayed entries
}

function formatTimeUnit(unit) {
    return unit < 10 ? '0' + unit : unit;
}


// Initial load
displayJournalEntries();
displayTasks();
