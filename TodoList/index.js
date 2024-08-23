const wrap = document.querySelector(".wrap")
const regForm = wrap.querySelector(".regWrap form");
const titleInput = regForm.querySelector("#titleInput");
const contentInput = regForm.querySelector("textarea");
const inputState = regForm.querySelectorAll(".stateInput input");
const regBtn = regForm.querySelector(".regBtn");

const listGroup = wrap.querySelector(".listWrap");
const todoList = listGroup.querySelector(".todoList ul");
const doingList = listGroup.querySelector(".doingList ul");
const doneList = listGroup.querySelector(".doneList ul");


// todoState 상태 관리
let todoState = "todo";
inputState.forEach((item) => {
  item.addEventListener("click", (e) => {
    todoState = e.target.className.slice(0, -5);
  });
});


// todo 등록함수
let todo = JSON.parse(localStorage.getItem("todo"));
todo = todo ?? [];

function regTodo() {
  const todoTitle = titleInput.value;
  const todoContent = contentInput.value;
  let id = JSON.parse(localStorage.getItem("id"));
  id = id ?? 0;

  if(todoTitle === "" || todoContent === "") {
    regBtn.setAttribute("disabled");
  } else {
    regBtn.removeAttribute("disabled");
  }

  const todoItem = {
    title: todoTitle,
    content: todoContent,
    state: todoState
  };
  todo.push(todoItem);
  
  localStorage.setItem("todo", JSON.stringify(todo));
  localStorage.setItem("id", JSON.stringify(id++));

  showTodo();

  // 초기화
  titleInput.value = "";
  contentInput.value = "";
  inputState[0].checked = true;
  todoState = inputState[0].className.slice(0, -5);
}

regBtn.addEventListener("click", () => {
  regTodo();
})

function showTodo() {
  todo.map((item) => {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const div = document.createElement("div");
    const editBtn  = document.createElement("button");
    const delBtn  = document.createElement("button");

    li.id = item.id
    h3.innerText = item.title;
    
    div.classList.add("setBtnWrap");
    editBtn.innerText = "Edit";
    editBtn.classList.add("editBtn");
    delBtn.innerText = "Del";
    delBtn.classList.add("delBtn");
    div.append(editBtn, delBtn);

    li.append(h3, div);

    if(item.state === "todo") {
      todoList.appendChild(li);
    } else if(item.state === "doing") {
      doingList.appendChild(li);
    } else {
      li.classList.add("done");
      doneList.appendChild(li);
    }
  })
}

showTodo();