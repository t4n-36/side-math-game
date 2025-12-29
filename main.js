/* ==============================
   足し算クイズ
============================== */

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

/* ==============================
   素因数分解ゲーム
============================== */

let pfNumber = 0;
let originalNumber = 0;
let history = [];
let pfScore = 0;

const MAX_TIME = 30;
let timeLeft = MAX_TIME;
let miss = 0;
let timerId = null;

const primeChoices = [2, 3, 5, 7, 11, 13];

// ローカル最高スコア
let bestScore = Number(localStorage.getItem("pfBestScore")) || 0;
document.getElementById("best-score").textContent = bestScore;

// 必ず 1 になる数を生成
function generateFactorNumber() {
  const count = Math.floor(Math.random() * 4) + 3; // 3〜6個
  let n = 1;

  for (let i = 0; i < count; i++) {
    const p = primeChoices[Math.floor(Math.random() * primeChoices.length)];
    n *= p;
  }
  return n;
}

// ゲーム開始
function startPrimeFactorGame() {
  clearInterval(timerId);
  document.getElementById("pf-area").style.display = "block";

  timeLeft = MAX_TIME;
  miss = 0;
  pfScore = 0;

  document.getElementById("time").textContent = timeLeft;
  document.getElementById("miss").textContent = miss;
  document.getElementById("pf-message").textContent = "";

  updateTimeBar();
  nextQuestion();
  startTimer();
}

// 次の問題
function nextQuestion() {
  pfNumber = generateFactorNumber();
  originalNumber = pfNumber;
  history = [];
  updateUI();
  updateHistory();
}

// タイマー
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

// 時間バー更新
function updateTimeBar() {
  const bar = document.getElementById("time-bar-inner");
  if (!bar) return;

  const ratio = timeLeft / MAX_TIME;
  bar.style.width = (ratio * 100) + "%";

  if (timeLeft <= 10) {
    bar.style.background = "#f44336"; // 赤
  } else if (timeLeft <= 20) {
    bar.style.background = "#ff9800"; // オレンジ
  } else {
    bar.style.background = "linear-gradient(90deg, #4caf50, #8bc34a)";
  }
}

// UI更新
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

// 履歴表示
function updateHistory() {
  document.getElementById("pf-history").textContent =
    history.length === 0
      ? `${originalNumber} = ?`
      : `${originalNumber} = ${history.join(" × ")}`;
}

// 素数選択
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
      finishGame("❌ ミス上限");
    }
  }
}

// 終了・結果表示
function finishGame(title) {
  clearInterval(timerId);

  if (pfScore > bestScore) {
    bestScore = pfScore;
    localStorage.setItem("pfBestScore", bestScore);
    document.getElementById("best-score").textContent = bestScore;
  }

  document.getElementById("pf-current-number").textContent = title;
  document.getElementById("pf-history").textContent =
    `結果：正解 ${pfScore} 問 ／ ミス ${miss} 回`;

  document.getElementById("pf-buttons").innerHTML = "";
  document.getElementById("pf-message").textContent =
    "おつかれさまでした！";
}


