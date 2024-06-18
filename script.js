"use strict";

let dayOrder = 0;
let score = 0;
let combo = 0;
let rank = "";
let weekLoop = 0;
let monthLoop = 0;
let weekNumber = 1;
let buildupScore = 0;
let monthScore = 0;
const wrapper = document.querySelector(".wrapper");

updateScore();
updateCombo();
updateRank();
eventListeners();

function eventListeners() {
  document.querySelectorAll(".success").forEach((successDay, index) => {
    successDay.addEventListener("click", function () {
      if (
        index === 0 ||
        document
          .querySelectorAll(".week-day")
          [index - 1].classList.contains("completed") ||
        document
          .querySelectorAll(".week-day")
          [index - 1].classList.contains("failed")
      ) {
        const weekDay = successDay.closest(".week-day");
        weekDay.classList.add("completed");
        weekDay.classList.remove("failed");
        weekDay.textContent = "";
        dayOrder++;

        const dayNumber = document.createElement("p");
        dayNumber.classList.add("completed-day");
        dayNumber.textContent = `Day ${dayOrder}`;
        weekDay.appendChild(dayNumber);

        score += Math.round(10 + combo * 0.3);
        buildupScore += Math.round(10 + combo * 0.3);
        monthScore += Math.round(10 + combo * 0.3);
        combo += 1;
        weekLoop++;

        updateScore();
        updateCombo();
        updateRank();
      }
    });
  });

  document.querySelectorAll(".fail").forEach((failDay, index) => {
    failDay.addEventListener("click", function () {
      if (
        index === 0 ||
        document
          .querySelectorAll(".week-day")
          [index - 1].classList.contains("completed") ||
        document
          .querySelectorAll(".week-day")
          [index - 1].classList.contains("failed")
      ) {
        const weekDay = failDay.closest(".week-day");
        weekDay.classList.add("failed");
        weekDay.classList.remove("completed");
        weekDay.textContent = "";
        dayOrder++;

        const dayNumber = document.createElement("p");
        dayNumber.classList.add("completed-day");
        dayNumber.textContent = `Day ${dayOrder}`;
        weekDay.appendChild(dayNumber);

        score -= 10;
        buildupScore -= 10;
        monthScore -= 10;
        combo = 0;
        weekLoop++;
        updateScore();
        updateCombo();
        updateRank();
      }
    });
  });
}

function updateScore() {
  if (weekLoop === 7) {
    addInput();
    weekLoop = 0;
    weekNumber++;
    monthLoop++;
    if (monthLoop === 4) {
      monthLoop = 0;
      score += monthScore * 2;
      monthScore = 0;
    } else {
      score += buildupScore * 0.5;
    }
    buildupScore = 0;
  }

  document.querySelector(".score").textContent = `Score: ${score} / 5000`;
}

function updateCombo() {
  document.querySelector(".combo").textContent = `Combo: ${combo}x`;
}

function updateRank() {
  if (score >= 0 && score <= 499) {
    rank = "Wood";
  } else if (score >= 500 && score <= 1499) {
    rank = "Silver";
  } else if (score >= 1500 && score <= 2999) {
    rank = "Platinum";
  } else if (score >= 3000 && score <= 4999) {
    rank = "Diamond";
  } else if (score >= 5000) {
    rank = "Master";
  }

  document.querySelector(".rank").textContent = `${rank} Rank`;
}

function addInput() {
  const weekSelector = document.querySelector(".week");
  const inputField = document.createElement("input");
  const inputButton = document.createElement("button");

  inputField.classList.add("input-text");
  inputButton.classList.add("input-button");
  inputButton.textContent = "Add";

  weekSelector.after(inputField, inputButton);

  inputButton.addEventListener("click", () => {
    const inputValue = inputField.value.trim();
    if (inputValue) {
      inputField.remove();
      inputButton.remove();
      const weekJournal = document.createElement("p");
      const weekNumberDisplay = document.createElement("p");

      const date = new Date();
      weekNumberDisplay.innerHTML = `Week ${
        weekNumber - 1
      } <br> Score: ${score}`;
      weekJournal.textContent = inputValue;
      weekJournal.classList.add("journal-entry");
      weekNumberDisplay.classList.add("journal-week-number");

      weekSelector.after(weekJournal);
      weekJournal.appendChild(weekNumberDisplay);
      inputField.value = "";

      startNewWeek();
    }
  });
}

function startNewWeek() {
  const newWeek = document.createElement("div");
  newWeek.classList.add("week");
  wrapper.insertBefore(newWeek, document.querySelector(".week"));

  for (let i = 0; i < 7; i++) {
    const newWeekDay = document.createElement("div");
    newWeekDay.classList.add("week-day");

    const newSuccess = document.createElement("p");
    newSuccess.classList.add("success");
    newSuccess.textContent = "v";

    const newFail = document.createElement("p");
    newFail.classList.add("fail");
    newFail.textContent = "x";

    newWeek.appendChild(newWeekDay);
    newWeekDay.appendChild(newSuccess);
    newWeekDay.appendChild(newFail);
  }
  eventListeners();
}
