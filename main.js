let a;
let b;

function newQuestion() {
  a = Math.floor(Math.random() * 10);
  b = Math.floor(Math.random() * 10);

  document.getElementById("question").textContent =
    a + " + " + b + " はいくつ？";

  document.getElementById("answer").value = "";
  document.getElementById("result").textContent = "";
}

function checkAnswer() {
  const userAnswer =
    Number(document.getElementById("answer").value);

  if (userAnswer === a + b) {
    document.getElementById("result").textContent = "正解！";
    newQuestion();
  } else {
    document.getElementById("result").textContent = "ちがうよ";
  }
}

newQuestion();

function newQuestion() {
  const level = document.getElementById("level").value;

  if (level === "easy") {
    a = Math.floor(Math.random() * 10);
    b = Math.floor(Math.random() * 10);
  } else if (level === "normal") {
    a = Math.floor(Math.random() * 50);
    b = Math.floor(Math.random() * 50);
  } else {
    a = Math.floor(Math.random() * 100);
    b = Math.floor(Math.random() * 100);
  }

  document.getElementById("question").textContent =
    `${a} + ${b} はいくつ？`;
}

let score = 0;

if (userAnswer === a + b) {
  score++;
  document.getElementById("score").textContent = score;
}
