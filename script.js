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
  const userAnswer = Number(document.getElementById("answer").value);

  if (userAnswer === a + b) {
    document.getElementById("result").textContent = "正解！🎉";
    newQuestion();
  } else {
    document.getElementById("result").textContent = "ちがうよ…";
  }
}

// ページを開いたときに最初の問題を出す
newQuestion();
