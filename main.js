/* ================================
   Firebase（そのままでOK）
================================ */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBmGCh5ReN4wErT2exxP3u1Eo-cEnJKQt4",
  authDomain: "side-math-game.firebaseapp.com",
  projectId: "side-math-game",
  storageBucket: "side-math-game.firebasestorage.app",
  messagingSenderId: "240836494206",
  appId: "1:240836494206:web:f1979d0ba424c307bca92f",
  measurementId: "G-GTR2T3BPB5"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

/* ================================
   足し算クイズ
================================ */
let a = 0;
let b = 0;
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

/* HTML から呼べるようにする */
window.newQuestion = newQuestion;
window.checkAnswer = checkAnswer;

/* 初回 */
newQuestion();

/* ================================
   素因数分解ゲーム
================================ */
const primeChoices = [2, 3, 5, 7, 11, 13];

let pfNumber = 0;
let originalNumber = 0;
let history = [];
let pfScore = 0;

let timeLeft = 30;
let miss = 0;
let timerId = null;

/* 最高スコア（端末保存） */
let bestScore = Number(localStorage.getItem("pfBestScore")) || 0;
document.getElementById("best-score").textContent = bestScore;

/* 必ず 1 になる数を作る */
function generateFactorNumber() {
  const count = Math.floor(Math.random() * 4) + 3; // 3〜6個
  let n = 1;
  for (let i = 0; i < count; i++) {
    const p = primeChoices[Math.floor(Math.random() * primeChoices.length)];
    n *= p;
  }
  return n;
}

/* スタート */
function startPrimeFactorGame() {
  clearInterval(timerId);

  document.getElementById("pf-area").style.display = "block";

  timeLeft = 30;
  miss = 0;
  pfScore = 0;

  document.getElementById("time").textContent = timeLeft;
  document.getElementById("miss").textContent = miss;
  document.getElementById("pf-message").textContent = "";

  nextQuestion();
  startTimer();
}

/* 次の問題 */
function nextQuestion() {
  pfNumber = generateFactorNumber();
  originalNumber = pfNumber;
  history = [];

  updateUI();
  updateHistory();
}

/* タイマー */
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;

    if (timeLeft <= 0) {
      finishGame("⏱ 時間終了");
    }
  }, 1000);
}

/* UI更新 */
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

/* 履歴（完成形も必ず表示） */
function updateHistory() {
  if (history.length === 0) {
    document.getElementById("pf-history").textContent =
      `${originalNumber} = ?`;
  } else {
    document.getElementById("pf-history").textContent =
      `${originalNumber} = ${history.join(" × ")}`;
  }
}

/* 選択処理 */
function choosePrime(p) {
  if (pfNumber % p === 0) {
    pfNumber /= p;
    history.push(p);
    updateHistory();

    if (pfNumber === 1) {
      pfScore++;
      document.getElementById("pf-message").textContent =
        "⭕ 正解！完成形を表示しました";
      nextQuestion();
    } else {
      updateUI();
      document.getElementById("pf-message").textContent = "⭕ 正解";
    }
  } else {
    miss++;
    document.getElementById("miss").textContent = miss;
    document.getElementById("pf-message").textContent = "❌ 割れません";

    if (miss >= 2) {
      finishGame("❌ 終了");
    }
  }
}

/* 終了処理 */
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
  document.getElementById("pf-message").textContent = "おつかれさまでした！";
}

/* HTML から呼べるように */
window.startPrimeFactorGame = startPrimeFactorGame;
