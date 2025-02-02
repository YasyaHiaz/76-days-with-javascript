let tasks = [];
let timer;
let timeLeft = 25 * 60;
let isRunning = false;
let isWorkPhase = true;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function updateTimerDisplay() {
    document.getElementById('time').textContent = formatTime(timeLeft);
    document.getElementById('breakTime').textContent = formatTime(timeLeft);
}

function toggleTimer() {
    const startBtn = document.getElementById('startBtn');
    if (!isRunning) {
        isRunning = true;
        startBtn.innerHTML = '<i class="fas fa-pause"></i>';
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                switchPhase();
            }
        }, 1000);
    } else {
        clearInterval(timer);
        isRunning = false;
        startBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorkPhase = true;
    timeLeft = 25 * 60;
    document.getElementById('startBtn').innerHTML = '<i class="fas fa-play"></i>';
    updateTimerDisplay();
}

function switchPhase() {
    isWorkPhase = !isWorkPhase;
    timeLeft = isWorkPhase ? 25 * 60 : 5 * 60;
    updateTimerDisplay();

    if (!isWorkPhase) {
        new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
    }

    alert(isWorkPhase ? 'Work time!' : 'Break time!');
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (!taskText) return;

    const task = {
        text: taskText,
        completed: false,
        time: new Date()
    };

    tasks.push(task);
    input.value = '';
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    const completedCount = tasks.filter(task => task.completed).length;

    document.querySelector('.task-count').textContent = `(${tasks.length} Tasks)`;
    document.getElementById('completedTasks').textContent = completedCount;
    document.getElementById('totalTasks').textContent = tasks.length;

    list.innerHTML = tasks.map((task, index) => `
<li class="task-item">
  <div class="task-checkbox ${task.completed ? 'completed' : ''}" 
       onclick="toggleTask(${index})">
    ${task.completed ? '<i class="fas fa-check"></i>' : ''}
  </div>
  <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
  <span class="task-time">${task.time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    })}</span>
</li>
`).join('');
}

document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial render
updateTimerDisplay();