const wrap = document.querySelector(".wrap");
const regForm = wrap.querySelector(".regWrap form");

const titleInput = regForm.querySelector("#titleInput");
const contentInput = regForm.querySelector("textarea");
const stateInput = regForm.querySelectorAll(".stateInput input");

const regBtn = regForm.querySelector(".regBtn");

const listGroup = wrap.querySelector(".listWrap");
const todoList = listGroup.querySelector(".todoList ul");
const doingList = listGroup.querySelector(".doingList ul");
const doneList = listGroup.querySelector(".doneList ul");

const editBtn = listGroup.querySelectorAll(".editBtn");
const delBtn = listGroup.querySelectorAll(".delBtn");

// Todo 로컬스토리지 생성
let todoState = "todo";
let todo = JSON.parse(localStorage.getItem("todo")) ?? [];
let id = JSON.parse(localStorage.getItem("id")) ?? 0;

// 현재 수정 중인 Todo의 ID를 저장
let currentEditId = null;

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
  btnBox.classList.add("setBtnWrap");
  
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
  if(todoItem.state === "done") {
    todoLi.classList.add("done")
  }
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
  if (!todoTitle || !todoContent) {
    alert("제목 또는 내용을 입력하세요!");
    return;
  }

  // 수정 모드인지 확인
  if (currentEditId !== null) {
    // 수정 모드일 경우 기존 항목 업데이트
    todo = todo.map(item => {
      if (item.id === currentEditId) {
        return {
          ...item,
          title: todoTitle,
          content: todoContent,
          state: todoState,
        };
      }
      return item;
    });

    // 로컬 스토리지 업데이트 및 화면 갱신
    localStorage.setItem("todo", JSON.stringify(todo));
    displayTodo();

    // 수정 모드 초기화
    currentEditId = null;
    regBtn.textContent = "Register";
  } else {
    // 새 항목 추가 모드
    const todoItem = {
      title: todoTitle,
      content: todoContent,
      state: todoState,
      id: id,
    };
    todo.push(todoItem);

    localStorage.setItem("todo", JSON.stringify(todo));
    localStorage.setItem("id", JSON.stringify(++id));

    setTodo(todoItem);
  }

  // 초기화
  titleInput.value = "";
  contentInput.value = "";
  stateInput[0].checked = true;
  todoState = stateInput[0].className.slice(0, -5);
}

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
  const todoItem = todo.find(item => item.id === parseInt(id));
  if (todoItem) {
    titleInput.value = todoItem.title;
    contentInput.value = todoItem.content;
    todoState = todoItem.state;

    // State 라디오 버튼 체크 상태 설정
    stateInput.forEach(input => {
      input.checked = input.className.includes(todoState);
    });

    currentEditId = todoItem.id;
    regBtn.textContent = "Edit";
  }
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
  // 기존 목록을 초기화
  todoList.innerHTML = "";
  doingList.innerHTML = "";
  doneList.innerHTML = "";

  todo.forEach(item => {
    setTodo(item);
  });
}

displayTodo();


// Todo 상세표시 함수
// Todo 상세표시 함수
function todoDetail() {
  const todoListItems = listGroup.querySelectorAll("ul li");
  
  // 모달 생성
  const modal = document.createElement("div");
  modal.id = "modal";
  
  const modalContent = document.createElement("div");
  modalContent.classList.add("modalContent");
  
  const modalTitle = document.createElement("h2");
  const modalText = document.createElement("p");
  const modalCloseBtn = document.createElement("button");
  
  modalCloseBtn.textContent = "Close";
  modalCloseBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modalContent.append(modalTitle, modalText, modalCloseBtn);
  modal.append(modalContent);
  wrap.append(modal);

  // ul에 클릭 이벤트 리스너 추가 (이벤트 위임)
  todoList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI" || e.target.closest("li")) {
      const clickedItem = e.target.closest("li");
      const todoItem = todo.find(item => item.id === parseInt(clickedItem.id));
      if (todoItem) {
        modalTitle.textContent = todoItem.title;
        modalText.textContent = todoItem.content;

        modal.classList.add("active"); // 모달 열기
      }
    }
  });
}


todoDetail();
