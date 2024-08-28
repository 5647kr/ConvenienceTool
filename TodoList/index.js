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

  manageTodo(editBtn, delBtn, todoLi.id);
  
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
  const todoTitle = titleInput.value.trim();
  const todoContent = contentInput.value.trim();

  // 값 입력 확인
  if(!todoTitle || !todoContent) {
    alert("제목 또는 내용을 입력하세요!");
    return;
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


// Todo 입력 값 유효성 검사
function todoValidate() {
  const todoTitle = titleInput.value.trim();
  const todoContent = contentInput.value.trim();

  regBtn.disabled = !todoTitle || !todoContent;
}

titleInput.addEventListener("input", todoValidate);
contentInput.addEventListener("input", todoValidate);


// Todo 관리 함수
function manageTodo(editBtn, delBtn, id) {
  editBtn.addEventListener("click", () => editTodo(id));
  delBtn.addEventListener("click", () => delTodo(id));
}


// Todo 수정 함수
function editTodo(id) {
  console.log(id)
}


// Todo 삭제 함수
function delTodo(id) {
  // 1. id와 일치하지 않는 항목만 필터링하여 새로운 배열 생성
  todo = todo.filter(item => item.id !== parseInt(id));

  // 2. 변경된 todo 배열을 로컬 스토리지에 저장
  localStorage.setItem("todo", JSON.stringify(todo));

  // 3. UI에서 해당 항목을 제거
  const todoLi = document.getElementById(id);
  if (todoLi) {
    todoLi.remove();
  }
}





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
