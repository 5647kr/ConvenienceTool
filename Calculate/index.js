const prev = document.querySelector(".prev");
const calcResult = document.querySelector(".result");
const calcBtn = document.querySelectorAll(".calcTable button");
const calcState = document.querySelector(".result p");
const calcAnswer = document.querySelector(".result strong");
const record = document.querySelector(".prev ul")

calcBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const input = e.target.textContent;

    // 계산 자리수 제한
    if (calcAnswer.textContent.length > 9) {
      calcAnswer.textContent = calcAnswer.textContent.slice(0, -1);
    }

    // 처음 숫자 0 처리
    if (calcAnswer.innerText === "0" && btn.innerText !== ".") {
      calcAnswer.innerText = btn.innerText;
    } else if (btn.innerText === ".") {
      // 현재 숫자(마지막 연산자 뒤에 있는 숫자)에 소수점이 포함되어 있지 않은 경우에만 추가
      const lastNumber = calcAnswer.innerText.split(/[+\−×÷]/).pop(); // 마지막 숫자 추출
      if (!lastNumber.includes(".")) {
        calcAnswer.innerText += btn.innerText;
      }
    } else {
      calcAnswer.innerText += btn.innerText;
    }

    // 처음 수학기호로 시작시 처리
    const firstOperate = calcAnswer.innerText.charAt(0);
    if (["+", "−", "×", "÷", "="].includes(firstOperate)) {
      calcAnswer.innerText = "0";
    }

    // 초기화
    if(btn.innerText === "C") {
      calcAnswer.innerText = "0";
      calcState.innerText = "0";
    }

    // 결과값
    if(btn.innerText === "=") {
      calcAnswer.innerText = calcAnswer.innerText.slice(0, -1);
      calcState.innerText = calcAnswer.innerText;
    
      calculate();
      const recordState = document.createElement("li");
      const recordResult = document.createElement("li");

      recordState.innerText = calcState.innerText;
      recordResult.innerText = calcAnswer.innerText;
      
      record.append(recordState, recordResult)
    }
  });
});

function calculate() {
  // 수식을 연산자와 숫자로 분리
  let operators = calcState.innerText.match(/[+\−×÷]/g); // 연산자 배열
  let numbers = calcState.innerText.split(/[+\−×÷]/g).map(Number); // 숫자 배열

  // 곱셈과 나눗셈을 먼저 처리
  while (operators.includes("×") || operators.includes("÷")) {
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === "×") {
        numbers[i] = numbers[i] * numbers[i + 1];
        numbers.splice(i + 1, 1); // 다음 숫자를 제거
        operators.splice(i, 1);   // 해당 연산자를 제거
        break;
      } else if (operators[i] === "÷") {
        numbers[i] = numbers[i] / numbers[i + 1];
        numbers.splice(i + 1, 1); // 다음 숫자를 제거
        operators.splice(i, 1);   // 해당 연산자를 제거
        break;
      }
    }
  }

  // 덧셈과 뺄셈 처리
  while (operators.includes("+") || operators.includes("−")) {
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === "+") {
        numbers[i] = numbers[i] + numbers[i + 1];
        numbers.splice(i + 1, 1); // 다음 숫자를 제거
        operators.splice(i, 1);   // 해당 연산자를 제거
        break;
      } else if (operators[i] === "−") {
        numbers[i] = numbers[i] - numbers[i + 1];
        numbers.splice(i + 1, 1); // 다음 숫자를 제거
        operators.splice(i, 1);   // 해당 연산자를 제거
        break;
      }
    }
  };

  let resultNum = numbers[0] + ""; // 최종 결과는 남아 있는 유일한 숫자
  if(resultNum.length > 15) {
    resultNum = resultNum.slice(0, 15);
  }
  calcAnswer.innerText = resultNum;
}









const translate = document.querySelector(".translate");
let temperateInput = translate.querySelector(".temperate .transInput input");
let temperateSelect = translate.querySelector(".temperate .transInput select");
let weightInput = translate.querySelector(".weight .transInput input");
let weightSelect = translate.querySelector(".weight .transInput select");
let lengthInput = translate.querySelector(".length .transInput input");
let lengthSelect = translate.querySelector(".length .transInput select");
let extendInput = translate.querySelector(".extend .transInput input");
let extendSelect = translate.querySelector(".extend .transInput select");

// 길이 단위 변환
function length() {
  let lengthUnit = "밀리미터(mm)";
  let lengthNum = 1;

  lengthSelect.addEventListener("input", () => {
    lengthUnit = lengthSelect.value;
    lengthConversion(lengthNum, lengthUnit)
  });

  lengthInput.addEventListener("input", () => {
    lengthNum = lengthInput.value ? parseFloat(lengthInput.value) : 0;
    lengthConversion(lengthNum, lengthUnit)
  });
}

function lengthConversion(lengthNum, lengthUnit) {
  let mmLength = document.querySelector(".length .transResult ul li:nth-child(1) input");
  let cmLength = document.querySelector(".length .transResult ul li:nth-child(2) input");
  let mLength = document.querySelector(".length .transResult ul li:nth-child(3) input");
  let kmLength = document.querySelector(".length .transResult ul li:nth-child(4) input");
  let inLength = document.querySelector(".length .transResult ul li:nth-child(5) input");
  let ftLength = document.querySelector(".length .transResult ul li:nth-child(6) input");
  let ydLength = document.querySelector(".length .transResult ul li:nth-child(7) input");
  let mileLength = document.querySelector(".length .transResult ul li:nth-child(8) input");

  switch (lengthUnit) {
    case "밀리미터(mm)": {
      mmLength.value = lengthNum;
      cmLength.value = (lengthNum * 0.1).toFixed(6);
      mLength.value = (lengthNum * 0.001).toFixed(6);
      kmLength.value = (lengthNum * 0.000001).toFixed(9);
      inLength.value = (lengthNum * 0.0393701).toFixed(6);
      ftLength.value = (lengthNum * 0.00328084).toFixed(6);
      ydLength.value = (lengthNum * 0.00109361).toFixed(6);
      mileLength.value = (lengthNum * 0.000000621371).toFixed(9);
      break;
    }
    case "센티미터(cm)": {
      mmLength.value = (lengthNum * 10).toFixed(2);
      cmLength.value = lengthNum;
      mLength.value = (lengthNum * 0.01).toFixed(6);
      kmLength.value = (lengthNum * 0.00001).toFixed(9);
      inLength.value = (lengthNum * 0.393701).toFixed(6);
      ftLength.value = (lengthNum * 0.0328084).toFixed(6);
      ydLength.value = (lengthNum * 0.0109361).toFixed(6);
      mileLength.value = (lengthNum * 0.00000621371).toFixed(9);
      break;
    }
    case "미터(m)": {
      mmLength.value = (lengthNum * 1000).toFixed(2);
      cmLength.value = (lengthNum * 100).toFixed(2);
      mLength.value = lengthNum;
      kmLength.value = (lengthNum * 0.001).toFixed(6);
      inLength.value = (lengthNum * 39.3701).toFixed(6);
      ftLength.value = (lengthNum * 3.28084).toFixed(6);
      ydLength.value = (lengthNum * 1.09361).toFixed(6);
      mileLength.value = (lengthNum * 0.000621371).toFixed(9);
      break;
    }
    case "킬로미터(km)": {
      mmLength.value = (lengthNum * 1000000).toFixed(2);
      cmLength.value = (lengthNum * 100000).toFixed(2);
      mLength.value = (lengthNum * 1000).toFixed(2);
      kmLength.value = lengthNum;
      inLength.value = (lengthNum * 39370.1).toFixed(2);
      ftLength.value = (lengthNum * 3280.84).toFixed(2);
      ydLength.value = (lengthNum * 1093.61).toFixed(2);
      mileLength.value = (lengthNum * 0.621371).toFixed(6);
      break;
    }
    case "인치(in)": {
      mmLength.value = (lengthNum * 25.4).toFixed(2);
      cmLength.value = (lengthNum * 2.54).toFixed(2);
      mLength.value = (lengthNum * 0.0254).toFixed(6);
      kmLength.value = (lengthNum * 0.0000254).toFixed(9);
      inLength.value = lengthNum;
      ftLength.value = (lengthNum * 0.0833333).toFixed(6);
      ydLength.value = (lengthNum * 0.0277778).toFixed(6);
      mileLength.value = (lengthNum * 0.0000157828).toFixed(9);
      break;
    }
    case "피트(ft)": {
      mmLength.value = (lengthNum * 304.8).toFixed(2);
      cmLength.value = (lengthNum * 30.48).toFixed(2);
      mLength.value = (lengthNum * 0.3048).toFixed(6);
      kmLength.value = (lengthNum * 0.0003048).toFixed(9);
      inLength.value = (lengthNum * 12).toFixed(2);
      ftLength.value = lengthNum;
      ydLength.value = (lengthNum * 0.333333).toFixed(6);
      mileLength.value = (lengthNum * 0.000189394).toFixed(9);
      break;
    }
    case "야드(yd)": {
      mmLength.value = (lengthNum * 914.4).toFixed(2);
      cmLength.value = (lengthNum * 91.44).toFixed(2);
      mLength.value = (lengthNum * 0.9144).toFixed(6);
      kmLength.value = (lengthNum * 0.0009144).toFixed(9);
      inLength.value = (lengthNum * 36).toFixed(2);
      ftLength.value = (lengthNum * 3).toFixed(2);
      ydLength.value = lengthNum;
      mileLength.value = (lengthNum * 0.000568182).toFixed(9);
      break;
    }
    case "마일(mile)": {
      mmLength.value = (lengthNum * 1609344).toFixed(2);
      cmLength.value = (lengthNum * 160934.4).toFixed(2);
      mLength.value = (lengthNum * 1609.344).toFixed(2);
      kmLength.value = (lengthNum * 1.60934).toFixed(6);
      inLength.value = (lengthNum * 63360).toFixed(2);
      ftLength.value = (lengthNum * 5280).toFixed(2);
      ydLength.value = (lengthNum * 1760).toFixed(2);
      mileLength.value = lengthNum;
      break;
    }
    default: {
      console.error("Unknown length unit: ", lengthUnit);
    }
  }
}

// 넓이 단위 변환
function extend() {
  let extendUnit = "제곱미터(m²)";
  let extendNum = 1;

  extendSelect.addEventListener("input", () => {
    extendUnit = extendSelect.value;
    extendConversion(extendNum, extendUnit)
  });

  extendInput.addEventListener("input", () => {
    extendNum = extendInput.value ? parseFloat(extendInput.value) : 0;
    extendConversion(extendNum, extendUnit)
  });
}

function extendConversion(extendNum, extendUnit) {
  let mExtend = document.querySelector(".extend .transResult ul li:nth-child(1) input");
  let haExtend = document.querySelector(".extend .transResult ul li:nth-child(2) input");
  let kmExtend = document.querySelector(".extend .transResult ul li:nth-child(3) input");
  let ftExtend = document.querySelector(".extend .transResult ul li:nth-child(4) input");
  let ydExtend = document.querySelector(".extend .transResult ul li:nth-child(5) input");
  let pyengExtend = document.querySelector(".extend .transResult ul li:nth-child(6) input");

  switch (extendUnit) {
    case "제곱미터(m²)": {
      mExtend.value = extendNum;
      haExtend.value = (extendNum * 0.0001).toFixed(6);
      kmExtend.value = (extendNum * 0.000001).toFixed(6);
      ftExtend.value = (extendNum * 10.7639).toFixed(6);
      ydExtend.value = (extendNum * 1.19599).toFixed(6);
      pyengExtend.value = (extendNum * 0.3025).toFixed(6);
      break;
    }
    case "헥타르(ha)": {
      mExtend.value = (extendNum * 10000).toFixed(6);
      haExtend.value = extendNum;
      kmExtend.value = (extendNum * 0.01).toFixed(6);
      ftExtend.value = (extendNum * 107639.104).toFixed(6);
      ydExtend.value = (extendNum * 11959.9005).toFixed(6);
      pyengExtend.value = (extendNum * 3025).toFixed(6);
      break;
    }
    case "제곱킬로미터(km²)": {
      mExtend.value = (extendNum * 1000000).toFixed(6);
      haExtend.value = (extendNum * 100).toFixed(6);
      kmExtend.value = extendNum;
      ftExtend.value = (extendNum * 10763910.4).toFixed(6);
      ydExtend.value = (extendNum * 1195990.05).toFixed(6);
      pyengExtend.value = (extendNum * 302500).toFixed(6);
      break;
    }
    case "제곱피트(ft²)": {
      mExtend.value = (extendNum * 0.092903).toFixed(6);
      haExtend.value = (extendNum * 0.0000092903).toFixed(6);
      kmExtend.value = (extendNum * 0.000000092903).toFixed(6);
      ftExtend.value = extendNum;
      ydExtend.value = (extendNum * 0.111111).toFixed(6);
      pyengExtend.value = (extendNum * 0.028103).toFixed(6);
      break;
    }
    case "제곱야드(yd²)": {
      mExtend.value = (extendNum * 0.836127).toFixed(6);
      haExtend.value = (extendNum * 0.000083613).toFixed(6);
      kmExtend.value = (extendNum * 0.000000836127).toFixed(6);
      ftExtend.value = (extendNum * 9).toFixed(6);
      ydExtend.value = extendNum;
      pyengExtend.value = (extendNum * 0.252929).toFixed(6);
      break;
    }
    case "평": {
      mExtend.value = (extendNum * 3.30579).toFixed(6);
      haExtend.value = (extendNum * 0.000330579).toFixed(6);
      kmExtend.value = (extendNum * 0.00000330579).toFixed(6);
      ftExtend.value = (extendNum * 35.5832).toFixed(6);
      ydExtend.value = (extendNum * 3.95369).toFixed(6);
      pyengExtend.value = extendNum;
      break;
    }
  }
}

// 무게 단위 변환
function weight() {
  let weightUnit = "밀리그램(mg)";
  let weightNum = 1;

  weightSelect.addEventListener("input", () => {
    weightUnit = weightSelect.value;
    weightConversion(weightNum, weightUnit)
  });

  weightInput.addEventListener("input", () => {
    weightNum = weightInput.value ? parseFloat(weightInput.value) : 0;
    weightConversion(weightNum, weightUnit)
  });
}

function weightConversion(weightNum, weightUnit) {
  let mgWeight = document.querySelector(".weight .transResult ul li:nth-child(1) input");
  let gWeight = document.querySelector(".weight .transResult ul li:nth-child(2) input");
  let kgWeight = document.querySelector(".weight .transResult ul li:nth-child(3) input");
  let tWeight = document.querySelector(".weight .transResult ul li:nth-child(4) input");
  let ktWeight = document.querySelector(".weight .transResult ul li:nth-child(5) input");
  let lbWeight = document.querySelector(".weight .transResult ul li:nth-child(6) input");

  switch (weightUnit) {
    case "밀리그램(mg)": {
      mgWeight.value = weightNum;
      gWeight.value = (weightNum * 0.001).toFixed(6);
      kgWeight.value = (weightNum * 0.000001).toFixed(6);
      tWeight.value = (weightNum * 0.000000001).toFixed(9);
      ktWeight.value = (weightNum * 0.000000000001).toFixed(12);
      lbWeight.value = (weightNum * 0.00000220462).toFixed(6);
      break;
    }
    case "그램(g)": {
      mgWeight.value = (weightNum * 1000).toFixed(2);
      gWeight.value = weightNum;
      kgWeight.value = (weightNum * 0.001).toFixed(6);
      tWeight.value = (weightNum * 0.000001).toFixed(9);
      ktWeight.value = (weightNum * 0.000000001).toFixed(12);
      lbWeight.value = (weightNum * 0.00220462).toFixed(6);
      break;
    }
    case "킬로그램(kg)": {
      mgWeight.value = (weightNum * 1000000).toFixed(2);
      gWeight.value = (weightNum * 1000).toFixed(2);
      kgWeight.value = weightNum;
      tWeight.value = (weightNum * 0.001).toFixed(9);
      ktWeight.value = (weightNum * 0.000001).toFixed(12);
      lbWeight.value = (weightNum * 2.20462).toFixed(6);
      break;
    }
    case "톤(t)": {
      mgWeight.value = (weightNum * 1000000000).toFixed(2);
      gWeight.value = (weightNum * 1000000).toFixed(2);
      kgWeight.value = (weightNum * 1000).toFixed(2);
      tWeight.value = weightNum;
      ktWeight.value = (weightNum * 0.001).toFixed(12);
      lbWeight.value = (weightNum * 2204.62).toFixed(2);
      break;
    }
    case "킬로톤(kt)": {
      mgWeight.value = (weightNum * 1000000000000).toFixed(2);
      gWeight.value = (weightNum * 1000000000).toFixed(2);
      kgWeight.value = (weightNum * 1000000).toFixed(2);
      tWeight.value = (weightNum * 1000).toFixed(2);
      ktWeight.value = weightNum;
      lbWeight.value = (weightNum * 2204622.62).toFixed(2);
      break;
    }
    case "파운드(lb)": {
      mgWeight.value = (weightNum * 453592.37).toFixed(2);
      gWeight.value = (weightNum * 453.59237).toFixed(2);
      kgWeight.value = (weightNum * 0.45359237).toFixed(6);
      tWeight.value = (weightNum * 0.00045359237).toFixed(9);
      ktWeight.value = (weightNum * 0.00000045359237).toFixed(12);
      lbWeight.value = weightNum;
      break;
    }
    default: {
      console.error("Unknown weight unit: ", weightUnit);
    }
  }
}

// 온도 단위 변환
function temperate() {
  let temperateUnit = "섭씨(°C)";
  let temperateNum = 1;

  temperateSelect.addEventListener("input", () => {
    temperateUnit = temperateSelect.value;
    temperatureConversion(temperateNum, temperateUnit)
  });

  temperateInput.addEventListener("input", () => {
    temperateNum = temperateInput.value ? parseFloat(temperateInput.value) : 0;
    temperatureConversion(temperateNum, temperateUnit)
  });
}

function temperatureConversion(temperateNum, temperateUnit) {
  let cTemperate = document.querySelector(".temperate .transResult ul li:nth-child(1) input");
  let fTemperate = document.querySelector(".temperate .transResult ul li:nth-child(2) input");
  let kTemperate = document.querySelector(".temperate .transResult ul li:nth-child(3) input");
  let rTemperate = document.querySelector(".temperate .transResult ul li:nth-child(4) input");

  switch (temperateUnit) {
    case "섭씨(°C)": {
      cTemperate.value = temperateNum.toFixed(2);
      fTemperate.value = ((temperateNum * 9 / 5) + 32).toFixed(2);
      kTemperate.value = (temperateNum + 273.15).toFixed(2);
      rTemperate.value = ((temperateNum + 273.15) * 9 / 5).toFixed(2);
      break;
    }
    case "화씨(°F)": {
      cTemperate.value = ((temperateNum - 32) * 5 / 9).toFixed(2);
      fTemperate.value = temperateNum.toFixed(2);
      kTemperate.value = ((temperateNum - 32) * 5 / 9 + 273.15).toFixed(2);
      rTemperate.value = (temperateNum + 459.67).toFixed(2);
      break;
    }
    case "절대온도(K)": {
      cTemperate.value = (temperateNum - 273.15).toFixed(2);
      fTemperate.value = ((temperateNum - 273.15) * 9 / 5 + 32).toFixed(2);
      kTemperate.value = temperateNum.toFixed(2);
      rTemperate.value = (temperateNum * 9 / 5).toFixed(2);
      break;
    }
    case "°R": {
      cTemperate.value = ((temperateNum - 491.67) * 5 / 9).toFixed(2);
      fTemperate.value = (temperateNum - 459.67).toFixed(2);
      kTemperate.value = (temperateNum * 5 / 9).toFixed(2);
      rTemperate.value = temperateNum.toFixed(2);
      break;
    }
    default: {
      console.error("Unknown temperature unit: ", temperateUnit);
    }
  }
}
// 함수 호출
length();
extend();
weight();
temperate();

