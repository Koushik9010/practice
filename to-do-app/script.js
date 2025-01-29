const todoForm = document.getElementById("todo-form");
const submitBtn = document.getElementById("btn");

let todoListArray = [];
let updating = false;
let updatingTodoIndex = 0;

const generateListItem = () => {
  const displayDiv = document.getElementById("display");

  displayDiv.innerHTML = "";

  todoListArray.map((todo, index) => {
    let markUp = `
        <div class="list-item" id= "${index}">
            <p>Task: ${todo.todo}</p>
            <p>Category: ${todo.category}</p>
            <p>Date: ${todo.date}</p>
            <div class = btn-container>
              <button class = 'update-btn' onclick = 'updateTodo(${index})'>Update</button>
              <button class = "remove-btn" onclick = "removeTodo('${todo.todo}')">Remove</button>
            </div>
        <div>
    `;
    displayDiv.insertAdjacentHTML("beforeend", markUp);
  });
};

//load the data on page load
window.addEventListener("load", () => {
  console.log(localStorage.getItem("todolist"));
  console.log(JSON.parse(localStorage.getItem("todolist")));

  //todo list array input
  const saveTodo = localStorage.getItem("todolist");
  if (saveTodo) {
    todoListArray = JSON.parse(saveTodo);
    generateListItem();
  }
});

todoForm.onsubmit = (event) => {
  event.preventDefault();

  // FormData object
  let formData = new FormData(todoForm);

  // make an object of the data inputs from the form
  let data = Object.fromEntries(formData);
  console.log(data);

  //check the data
  if (data.todo.trim() == "" || data.todo.trim().length <= 5) {
    return alert("Please enter item with minimum length of 6 characters.");
  }

  if (data.date.trim() == "") {
    return alert("Date can not be empty");
  }

  if (updating) {
    todoListArray = todoListArray.map((todo, i) => {
      if (i === updatingTodoIndex) {
        return data; //replace the matching items with the new ones
      }
      return todo; //keep the other item unchanged
    });

    updating = false;
    updatingTodoIndex = 0;
  } else {
    todoListArray.push(data);
  }

  //save to localstorage
  localStorage.setItem("todolist", JSON.stringify(todoListArray));
  todoForm.reset();
  generateListItem(data);
  submitBtn.innerText = "Add"
};

//remove the item
const removeTodo = (todo) => {
  todoListArray = todoListArray.filter((item) => item.todo !== todo);
  localStorage.setItem("todolist", JSON.stringify(todoListArray));
  generateListItem();
};

//add the updated vale to the form
const updateTodo = (index) => {
  updating = true;
  submitBtn.innerText = "Update Task"
  todoListArray = todoListArray.map((todo, i) => {
    if (i === index) {
      updatingTodoIndex = index;
      document.getElementById("todo-input").value = todo.todo;
      document.getElementById("todo-cat").value = todo.category;
      document.getElementById("todo-date").value = todo.date;
    }
    return todo;
  });
};
