// Selectors
const todoInput = document.querySelector('.todo-input'); // todo-input is html class tag
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo'); // first get the element from the query 1.

// Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo); // add event listener to button
todoList.addEventListener('click', deleteCheck );
filterOption.addEventListener('click', filterTodo); // then add event listener 2.

//Functions
function addTodo(event){
    // prevents page from refreshing when clicked
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI, append the LI to the parent DIV. Just like HTML structure.
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    // CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // APPEND TO LIST
    todoList.appendChild(todoDiv);
    //Clear Todo input value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement; // get parent element to delete the whole structure
        // ANIMATION
        todo.classList.add("fall");
        removeLocalTodos(todo);
        // Function activates only after animation
        todo.addEventListener("transitionend", function(){
        todo.remove();
        });
    }

    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){ //then write the function using the event listener that triggers it 3.
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all": 
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }

    });
}

function saveLocalTodos(todo){
    // IS THERE ALREADY CONTENTS
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // Create LI, append the LI to the parent DIV. Just like HTML structure.
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // CHECK MARK BUTTON
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // APPEND TO LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // console.log(todo.children); #print this to know the index of what you want
    // get the check above to fill the todo array.
    const todoText = todo.children[0].innerText; // navigate to innerText of <li>
    todos.splice(todos.indexOf(todoText), 1); //indexOf is universal function, remove 1 element.
    localStorage.setItem("todos", JSON.stringify(todos));
}