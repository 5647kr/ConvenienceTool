// 온도 변환 함수
const translate = document.querySelector(".translate");
let temperateInput = translate.querySelector(".temperate .transInput input");
let temperateSelect = translate.querySelector(".temperate .transInput select");

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
temperate();

