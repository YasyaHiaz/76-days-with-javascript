// Get elements
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Add task function
addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create task item
    const listItem = document.createElement("li");
    listItem.className = "todo-item";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`; // Trash icon
    deleteButton.addEventListener("click", () => {
        // Eliminate list item with a fade-out animation
        listItem.style.transition = "opacity 0.3s, transform 0.3s";
        listItem.style.opacity = "0";
        listItem.style.transform = "translateX(-50px)";
        setTimeout(() => {
            taskList.removeChild(listItem);
        }, 300);
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    // Add to list
    taskList.appendChild(listItem);

    // Clear input
    taskInput.value = "";
});

// Allow pressing Enter to add tasks
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addButton.click();
    }
});
