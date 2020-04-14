// firestore db
const db = firebase.firestore();

// DOM elements
const btns = document.querySelectorAll("button");
const form = document.querySelector("form");
const formAct = document.querySelector("form span");
const input = document.querySelector("input");
const error = document.querySelector(".error");

let activity = "walking";
btns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const currentTarget = event.target;

    // get activity
    activity = currentTarget.dataset.activity;

    // remove and add active class
    btns.forEach((btn) => btn.classList.remove("active"));
    currentTarget.classList.add("active");

    // set id of input field
    input.setAttribute("id", activity);

    // set text of form span
    formAct.textContent = activity;

    // call the update function
    update(data);
  });
});

// form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const energySpent = parseInt(input.value);
  if (energySpent) {
    db.collection("activities")
      .add({
        energySpent,
        activity,
        date: new Date().toString(),
      })
      .then(() => {
        error.textContent = "";
        input.value = "";
      });
  } else {
    error.textContent = "Please enter a valid spent energy";
  }
});
