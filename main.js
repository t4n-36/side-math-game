/* ===== 足し算クイズ ===== */

let a, b;
let score = 0;

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

  document.getElementById("answer").value = "";
  document.getElementById("result").textContent = "";
}

function checkAnswer() {
  const userAnswer = Number(document.getElementById("answer").value);

  if (userAnswer === a + b) {
    score++;
    document.getElementById("score").textContent = score;
    document.getElementById("result").textContent = "⭕ 正解！";
    newQuestion();
  } else {
    document.getElementById("result").textContent = "❌ ちがうよ";
  }
}

newQuestion();

/* ===== 素因数分解ゲーム ===== */

let pfNumber = 0;
let originalNumber = 0;
let history = [];
let pfScore = 0;

let timeLeft = 30;
let miss = 0;
let timerId = null;
let countdownId = null;

const primeChoices = [2, 3, 5, 7, 11, 13];

// 最高スコア
let bestScore = localStorage.getItem("pfBestScore") || 0;
document.getElementById("best-score").textContent = bestScore;

function generateFactorNumber() {
  const count = Math.floor(Math.random() * 4) + 3;
  let n = 1;
  for (let i = 0; i < count; i++) {
    const p = primeChoices[Math.floor(Math.random() * primeChoices.length)];
    n *= p;
  }
  return n;
}

function startPrimeFactorGame() {
  clearInterval(timerId);
  clearInterval(countdownId);

  document.getElementById("pf-area").style.visibility = "visible";
  document.getElementById("stop-btn").style.display = "inline-block";

  timeLeft = 30;
  miss = 0;
  pfScore = 0;

  document.getElementById("time").textContent = timeLeft;
  document.getElementById("miss").textContent = miss;
  document.getElementById("pf-buttons").innerHTML = "";
  document.getElementById("pf-history").textContent = "";
  document.getElementById("pf-message").textContent = "準備中…";

  startCountdown();
}

function startCountdown() {
  let count = 3;
  document.getElementById("pf-current-number").textContent = count;

  countdownId = setInterval(() => {
    count--;
    if (count > 0) {
      document.getElementById("pf-current-number").textContent = count;
    } else {
      clearInterval(countdownId);
      document.getElementById("pf-current-number").textContent = "START!";
      setTimeout(startGame, 500);
    }
  }, 1000);
}

function startGame() {
  document.getElementById("pf-message").textContent = "";
  nextQuestion();
  startTimer();
}

function nextQuestion() {
  pfNumber = generateFactorNumber();
  originalNumber = pfNumber;
  history = [];
  updateUI();
  updateHistory();
}

function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    updateTimeBar();

    if (timeLeft <= 0) {
      finishGame("⏱ 時間終了");
    }
  }, 1000);
}

function updateTimeBar() {
  const percent = (timeLeft / 30) * 100;
  const bar = document.getElementById("time-bar-inner");
  bar.style.width = percent + "%";

  if (percent > 50) {
    bar.style.background = "linear-gradient(90deg, #4caf50, #8bc34a)";
  } else if (percent > 20) {
    bar.style.background = "linear-gradient(90deg, #ffeb3b, #ffc107)";
  } else {
    bar.style.background = "linear-gradient(90deg, #f44336, #ff5722)";
  }
}

function updateUI() {
  document.getElementById("pf-current-number").textContent =
    "現在の数: " + pfNumber;

  const area = document.getElementById("pf-buttons");
  area.innerHTML = "";

  primeChoices.forEach(p => {
    const btn = document.createElement("button");
    btn.textContent = p;
    btn.onclick = () => choosePrime(p);
    area.appendChild(btn);
  });
}

function updateHistory() {
  document.getElementById("pf-history").textContent =
    history.length === 0
      ? `${originalNumber} = ?`
      : `${originalNumber} = ${history.join(" × ")}`;
}

function choosePrime(p) {
  if (pfNumber % p === 0) {
    pfNumber /= p;
    history.push(p);
    updateHistory();

    if (pfNumber === 1) {
      pfScore++;
      nextQuestion();
    } else {
      updateUI();
    }

    document.getElementById("pf-message").textContent = "⭕ 正解";
  } else {
    miss++;
    document.getElementById("miss").textContent = miss;
    document.getElementById("pf-message").textContent = "❌ 割れません";

    if (miss >= 2) {
      finishGame("❌ 終了");
    }
  }
}

function stopGame() {
  clearInterval(timerId);
  clearInterval(countdownId);
  finishGame("🛑 ストップしました");
}

function finishGame(title) {
  clearInterval(timerId);
  clearInterval(countdownId);

  if (pfScore > bestScore) {
    bestScore = pfScore;
    localStorage.setItem("pfBestScore", bestScore);
    document.getElementById("best-score").textContent = bestScore;
  }

  document.getElementById("pf-current-number").textContent = title;
  document.getElementById("pf-history").textContent =
    `結果：正解 ${pfScore} 問 ／ ミス ${miss} 回`;

  document.getElementById("pf-buttons").innerHTML = "";
  document.getElementById("pf-message").textContent = "おつかれさまでした！";
  document.getElementById("stop-btn").style.display = "none";
  updateTimeBar();
}

