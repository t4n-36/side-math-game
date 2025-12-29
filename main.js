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

let pfNumber = 0;
const primeChoices = [2, 3, 5, 7];

function startPrimeFactorGame() {
  pfNumber = Math.floor(Math.random() * 89) + 12; // 12〜100
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
        "🎉 1になりました！クリア！";
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

// 初回起動
startPrimeFactorGame();
