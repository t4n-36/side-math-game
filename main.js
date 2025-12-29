let a;
let b;
let correctAnswer;

// 問題を作る
function newQuestion() {
  a = Math.floor(Math.random() * 10);
  b = Math.floor(Math.random() * 10);
  correctAnswer = a + b;

  document.getElementById("question").textContent =
    a + " + " + b + " = ?";
  document.getElementById("answer").value = "";
  document.getElementById("result").textContent = "";
}

// 答えをチェック
function checkAnswer() {
  const userAnswer = Number(
    document.getElementById("answer").value
  );

  if (userAnswer === correctAnswer) {
    document.getElementById("result").textContent = "正解！";
    newQuestion();
  } else {
    document.getElementById("result").textContent = "ちがいます";
  }
}

// 最初の問題を出す
newQuestion();
