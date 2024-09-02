const calcDate = document.querySelector(".calcDate");
const afterDate = calcDate.querySelector(".afterDate");
const startDate = calcDate.querySelector(".startDate");
const endDate = calcDate.querySelector(".endDate");

const date = new Date();

// 오늘 날짜 가져오기
function today() {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = (date.getDate()).toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
const todayDate = today();

// 어제 날짜 가져오기
function yesterday() {
  date.setDate(date.getDate() - 1);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
const yesterdayDate = yesterday();

// 다음 날짜 가져오기
function nextday() {
  date.setDate(date.getDate() + 1);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = (date.getDate() + 1).toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
const nextdayDate = nextday();


// 며칠 후 날짜 계산 함수
function afterDateCalc() {
  const afterDateContent = `
    <p>${todayDate} 기준 <input type="number" min="0" max="9999">일 이후는?</p>
    <strong class="calcDate">계산된 날짜는 여기 표시됩니다.</strong>
  `
  afterDate.innerHTML = afterDateContent;

  const dateInput = afterDate.querySelector(".afterDate input");
  dateInput.addEventListener("input", (e) => {
    if (e.target.value.length > 4) {
      e.target.value = e.target.value.slice(0, 4);
    }

    const dateValue = e.target.value;
    const milliSecDay = 24 * 60 * 60 * 1000;
    const dateMilliSec = dateValue * milliSecDay;

    const futureDate = new Date(date.getTime() + dateMilliSec);

    const calcYear = futureDate.getFullYear();
    const calcMonth = (futureDate.getMonth() + 1).toString().padStart(2, "0");
    const calcDay = (futureDate.getDate()).toString().padStart(2, "0");

    const calcDate = calcYear+"."+calcMonth+"."+calcDay

    const calcDateContent = afterDate.querySelector(".calcDate");
    calcDateContent.textContent = calcDate;
  })
}

afterDateCalc();

function startDateCalc() {
    const startDateContent = `
    <p><input type="date" max="${yesterdayDate}"> 부터 ${todayDate} 까지 몇 일?</p>
    <strong class="calcDate">계산된 날짜는 여기 표시됩니다.</strong>
  `
  startDate.innerHTML = startDateContent;

  const dateInput = startDate.querySelector(".startDate input");
  dateInput.addEventListener("input", (e) => {
    const dateValue = new Date(e.target.value);
    const today = new Date(todayDate);

    const diffTime = today.getTime() - dateValue.getTime();
    const diffDate = diffTime / (1000 * 24 * 60 * 60);

    const calcDate = startDate.querySelector(".calcDate");
    calcDate.textContent = diffDate + "일";
  })
}

startDateCalc();


function endDateCalc() {
    const endDateContent = `
    <p>${todayDate} 부터 <input type="date" min="${nextdayDate}"> 까지 몇 일?</p>
    <strong class="calcDate">계산된 날짜는 여기 표시됩니다.</strong>
  `
  endDate.innerHTML = endDateContent;

  const dateInput = endDate.querySelector(".endDate input");
  dateInput.addEventListener("input", (e) => {
    const dateValue = new Date(e.target.value);
    const today = new Date(todayDate);

    const diffTime = dateValue.getTime() - today.getTime();
    const diffDate = diffTime / (1000 * 24 * 60 * 60);
    
    const calcDate = endDate.querySelector(".calcDate");
    calcDate.textContent = diffDate + "일";
  })
}

endDateCalc();