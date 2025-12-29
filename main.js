/* ===== 足し算クイズ ===== */

let a, b;
let score = 0;

// 新しい問題を作る（レベル対応）
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

// 答えをチェック
function checkAnswer() {
  const userAnswer =
    Number(document.getElementById("answer").value);

  if (userAnswer === a + b) {
    document.getElementById("result").textContent = "正解！";
    score++;
    document.getElementById("score").textContent = score;
    newQuestion();
  } else {
    document.getElementById("result").textContent = "ちがうよ";
  }
}

// 初回
newQuestion();

/* ===== 素因数分解ゲーム（非表示スタート＋最高スコア） ===== */

let pfNumber = 0;
let originalNumber = 0;
let history = [];
let pfScore = 0;

let timeLeft = 30;
let miss = 0;
let timerId = null;

const primeChoices = [2, 3, 5, 7, 11, 13];

// 最高スコア読み込み
let bestScore = localStorage.getItem("pfBestScore") || 0;
document.getElementById("best-score").textContent = bestScore;

// 必ず 1 になる数を作る
function generateFactorNumber() {
  const count = Math.floor(Math.random() * 4) + 3;
  let n = 1;

  for (let i = 0; i < count; i++) {
    const p = primeChoices[Math.floor(Math.random() * primeChoices.length)];
    n *= p;
  }
  return n;
}

// スタート
function startPrimeFactorGame() {
  clearInterval(timerId);

  document.getElementById("pf-area").style.display = "block";

  timeLeft = 30;
  miss = 0;
  pfScore = 0;

  document.getElementById("time").textContent = timeLeft;
  document.getElementById("miss").textContent = miss;
  document.getElementById("pf-message").textContent = "";

  nextPrimeFactorQuestion();
  startTimer();
}

// 次の問題
function nextPrimeFactorQuestion() {
  pfNumber = generateFactorNumber();
  originalNumber = pfNumber;
  history = [];

  updatePrimeFactorUI();
  updateHistory();
}

// タイマー
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;

    if (timeLeft <= 0) {
      finishGame("⏱ 時間終了");
    }
  }, 1000);
}

// UI更新
function updatePrimeFactorUI() {
  document.getElementById("pf-current-number").textContent =
    "現在の数: " + pfNumber;

  const buttonArea = document.getElementById("pf-buttons");
  buttonArea.innerHTML = "";

  primeChoices.forEach(p => {
    const btn = document.createElement("button");
    btn.textContent = p;
    btn.onclick = () => choosePrime(p);
    buttonArea.appendChild(btn);
  });
}

// 履歴表示
function updateHistory() {
  if (history.length === 0) {
    document.getElementById("pf-history").textContent =
      `${originalNumber} = ?`;
  } else {
    document.getElementById("pf-history").textContent =
      `${originalNumber} = ${history.join(" × ")}`;
  }
}

// 選択処理
function choosePrime(p) {
  if (pfNumber % p === 0) {
    pfNumber /= p;
    history.push(p);
    updateHistory();

    if (pfNumber === 1) {
      pfScore++;
      document.getElementById("pf-message").textContent =
        "⭕ 正解！次へ";
      nextPrimeFactorQuestion();
    } else {
      updatePrimeFactorUI();
      document.getElementById("pf-message").textContent = "正解！";
    }
  } else {
    miss++;
    document.getElementById("miss").textContent = miss;
    document.getElementById("pf-message").textContent =
      "❌ 割れません";

    if (miss >= 2) {
      finishGame("❌ ミス上限");
    }
  }
}

// 終了・結果表示
function finishGame(title) {
  clearInterval(timerId);

  // 最高スコア更新
  if (pfScore > bestScore) {
    bestScore = pfScore;
    localStorage.setItem("pfBestScore", bestScore);
    document.getElementById("best-score").textContent = bestScore;
  }

  document.getElementById("pf-current-number").textContent =
    title;

  document.getElementById("pf-history").textContent =
    `結果：正解 ${pfScore} 問（最高 ${bestScore}）`;

  document.getElementById("pf-buttons").innerHTML = "";
  document.getElementById("pf-message").textContent =
    "おつかれさまでした！";
}
