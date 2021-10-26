const errorContainer = document.getElementById("error-container");
const billInput = document.getElementById("bill-input");
const customTip = document.getElementById("custom-tip");
const peopleInput = document.getElementById("people-input");
const tipLabels = document
  .getElementById("tips-container")
  .getElementsByClassName("tip-box");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const resetBtn = document.getElementById("reset-btn");

// calc vars
let showTip = 0,
  showTotal = 0,
  bill = 0,
  tipPercent = 0,
  peopleNumber = 0;

// calc total and tip amount
function totalCalc() {
  if (peopleNumber > 0) {
    showTip = (bill / peopleNumber) * tipPercent;
    showTotal = bill / peopleNumber + showTip;
  } else {
    showTip = 0;
    showTotal = 0;
  }

  tipAmount.innerText = parseFloat(showTip).toFixed(2);
  totalAmount.innerText = parseFloat(showTotal).toFixed(2);

  if (showTotal > 0) {
    resetBtn.classList.remove("disabled");
  } else {
    resetBtn.classList.add("disabled");
  }
}

// add .select to tipLabels
function resetSelectedTip() {
  for (let i = 0; i < tipLabels.length; i++) {
    tipLabels[i].classList.remove("selected");
  }
}

const selectTip = (e) => {
  e.preventDefault();

  tipPercent = e.target.getElementsByTagName("input")[0].value;

  totalCalc();

  resetSelectedTip();

  e.target.closest(".tip-box").classList.add("selected");
};

for (let i = 0; i < tipLabels.length; i++) {
  tipLabels[i].addEventListener("click", selectTip);
}

// custom tip input
customTip.addEventListener("change", function (e) {
  tipPercent = e.target.value / 100;
  totalCalc();
  resetSelectedTip();
});

// $ bill input
billInput.addEventListener("change", function (e) {
  bill = e.target.value;
  totalCalc();
});

// number of people input
peopleInput.addEventListener("change", function (e) {
  let val = parseInt(e.target.value);

  if (val < 1) {
    errorContainer.classList.add("show-error");
  } else {
    errorContainer.classList.remove("show-error");
  }

  peopleNumber = val;

  totalCalc();
});

// reset button
resetBtn.addEventListener("click", function () {
  bill = 0;
  peopleNumber = 0;
  tipPercent = 0;
  showTip = 0;

  billInput.value = 0;
  peopleInput.value = 0;
  customTip.value = "";

  resetSelectedTip();

  totalCalc();
});
