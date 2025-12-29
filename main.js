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

/* ===== 素因数分解ゲーム ===== */

/* ===== 素因数分解ゲーム（最大値拡張・完成形） ===== */

let pfNumber = 0;
let history = [];
const primeChoices = [2, 3, 5, 7, 11, 13];

// 問題を作る（必ず1になる & 大きい数）
function generateFactorNumber() {
  const count = Math.floor(Math.random() * 4) + 3; // 3〜6個
  let n = 1;
  history = [];

  for (let i = 0; i < count; i++) {
    const p = primeChoices[Math.floor(Math.random() * primeChoices.length)];
    n *= p;
    history.push(p);
  }
  return n;
}

function startPrimeFactorGame() {
  pfNumber = generateFactorNumber();
  updatePrimeFactorUI();
  document.getElementById("pf-message").textContent = "";
}

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

function choosePrime(p) {
  if (pfNumber % p === 0) {
    pfNumber /= p;

    if (pfNumber === 1) {
      document.getElementById("pf-current-number").textContent =
        "🎉 1になりました！完全クリア！";
      document.getElementById("pf-buttons").innerHTML = "";
    } else {
      updatePrimeFactorUI();
    }

    document.getElementById("pf-message").textContent = "正解！";
  } else {
    document.getElementById("pf-message").textContent =
      "❌ その数では割れません";
  }
}

// 初回
startPrimeFactorGame();
