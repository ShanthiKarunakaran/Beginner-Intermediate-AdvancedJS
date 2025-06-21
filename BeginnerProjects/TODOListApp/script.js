//functions to add : storeTasks, AddTask, DeleteTask, EditTask, MarkComplete, retrieveTasks 
/*| Action        | Function                                                    |
| ------------- | ----------------------------------------------------------- |
| Page loads    | `retrieveTasks()` via `DOMContentLoaded`                    |
| Add task      | `addTask()` → `storeTasks()` → `displayTasks()`             |
| Mark complete | `toggleComplete(index)` → `storeTasks()` → `displayTasks()` |
| Delete task   | `deleteTask(index)` → `storeTasks()` → `displayTasks()`     |
*/

//ADD TASK Flow: 
    //attach click event listener to submit button 
    //when user hits submit, 
        //add task to array and localstorage
        //clear input field
        //add item to the li for UI display

        let tasks = [];
        const form = document.getElementById('todo-form');
        //wait for the DOM to load before accessing elements
        
        // Retrieve tasks from localStorage on page load
        //parse the JSON string into a JS array object
        //assign it to the global tasks variable
        //render the restored list
        document.addEventListener('DOMContentLoaded', function() {
            const storedTasks = localStorage.getItem('tasks');
            if (storedTasks) {
                tasks = JSON.parse(storedTasks);
                displayTasks();
            }
        });
        // Function to display tasks in the UI
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const taskInput = document.getElementById('taskInput');
            const task = taskInput.value.trim();
            if (task) {
                addTask(task);
                taskInput.value = '';
                displayTasks();
            } else {
                return;
            }
        });


        function addTask(task) {
            tasks.push({
                text: task,
                completed: false
            });
            storeTasks();
        }


        function storeTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
       
        function displayTasks() {
            const todoList = document.getElementById('todo-list'); 
            console.log('Displaying tasks:', tasks);
             // Clear the existing list
             todoList.innerHTML = ''; 
             tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.textContent = task.text;
                console.log(`Task: ${task.text}, Completed: ${task.completed}`);
                // Set the class based on completion status
                li.className = task.completed ? 'completed' : '';
                li.addEventListener('click', function() {
                    toggleComplete(index);
                });
                todoList.appendChild(li);

                // Create and append the delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                li.appendChild(deleteButton); //append button to the li
                todoList.appendChild(li);

                deleteButton.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent the click from toggling completion
                    deleteTask(index);
                });
             });
           
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            //update the storage and Ui with the changes
            storeTasks();
            displayTasks();
        }
        function toggleComplete(index) {
            tasks[index].completed = !tasks[index].completed;
            console.log(`Task: ${tasks[index].text}, Completed: ${tasks[index].completed}`);
             //update the storage and Ui with the changes
             storeTasks();
             displayTasks();
        }

        


