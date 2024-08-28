const wrap = document.querySelector(".wrap");
const regForm = wrap.querySelector(".regWrap form");

const titleInput = regForm.querySelector("#titleInput");
const contentInput = regForm.querySelector("textarea");
const stateInput = regForm.querySelectorAll(".stateInput input");

const regBtn = regForm.querySelector(".regBtn");

const listGroup = wrap.querySelector(".listWrap");
const todoList = listGroup.querySelector(".todoList ul")
const doingList = listGroup.querySelector(".doingList ul")
const doneList = listGroup.querySelector(".doneList ul");

const editBtn = listGroup.querySelectorAll(".editBtn");
const delBtn = listGroup.querySelectorAll(".delBtn");


// Todo 로컬스토리지 생성
let todoState = "todo";
let todo = JSON.parse(localStorage.getItem("todo")) ?? [];
let id = JSON.parse(localStorage.getItem("id")) ?? 0;


// Todo 상태관리
stateInput.forEach((item) => {
  item.addEventListener("click", (e) => {
    todoState = e.target.className.slice(0, -5);
  });
});


// Todo 생성 후 리스트에 추가
function setTodo(todoItem) {
  const todoLi = document.createElement("li");
  todoLi.id = todoItem.id;

  const todoTitle = document.createElement("h3");
  todoTitle.textContent = todoItem.title;

  const btnBox = document.createElement("div");
  btnBox.classList.add("setBtnWrap")
  
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("editBtn");

  const delBtn = document.createElement("button");
  delBtn.textContent = "Del";
  delBtn.classList.add("delBtn");

  btnBox.append(editBtn, delBtn);
  todoLi.append(todoTitle, btnBox);
  
  stateTodoList(todoItem.state).appendChild(todoLi);
}


// Todo state에 따른 구분 함수
function stateTodoList(state) {
  if (state === "todo") return todoList;
  if (state === "doing") return doingList;
  return doneList;
}


// Todo 등록 함수
function regTodo() {
  const todoTitle = titleInput.value;
  const todoContent = contentInput.value;

  // 값 입력 확인
  if(!todoTitle || !todoContent) {
    alert("제목 또는 내용을 입력하세요!");
    regBtn.disabled = true;
  } else {
    regBtn.disabled = false;
  }

  const todoItem = {
    title: todoTitle,
    content: todoContent,
    state: todoState,
    id: id
  };
  todo.push(todoItem);

  localStorage.setItem("todo", JSON.stringify(todo));
  localStorage.setItem("id", JSON.stringify(++id));

  setTodo(todoItem);

  // 초기화
  titleInput.value = "";
  contentInput.value = "";
  stateInput[0].checked = true;
  todoState = stateInput[0].className.slice(0, -5);
};

regBtn.addEventListener("click", () => {
  regTodo();
});


// Todo 표시 함수
function displayTodo() {
  todo.forEach((item) => {
    setTodo(item);
  })
}
displayTodo();






















// function editTodo(e) {
//   let id = parseInt(e.target.parentNode.parentNode.id);
//   todo.forEach((list, i) => {
//     if(list.id === id) {
//       titleInput.value = list.title;
//       contentInput.value = list.content;
//       todoState = list.state;
      
//       // state 속성 관리
//       if(todoState === "todo") {
//         stateInput[0].setAttribute("checked", true)
//       } else if(todoState === "doing") {
//         stateInput[1].setAttribute("checked", true)
//       } else {
//         stateInput[2].setAttribute("checked", true)
//       }
//     }
//   })

// }

// editBtn.forEach((edit) => {
//   edit.addEventListener("click", (e) => {
//     editTodo(e);
//   });
// })
