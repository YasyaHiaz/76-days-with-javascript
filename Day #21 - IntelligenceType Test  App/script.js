const wordBank = [
    "itu", "dingin", "kasih", "wajah", "siapa", "mati", "sampai", "ketika",
    "baku", "bapak", "tunas", "tidak", "berharap", "hilang", "kecuali", "sebelum",
    "agar", "hingga", "maupun", "mencuri", "rendah", "bukan", "ganti", "kota",
    "serupa", "hari", "waktu", "mimpi", "indah", "manis", "tumpah", "sayang",
    "gelap", "putih", "bintang", "malam", "pagi", "senja", "hujan", "tanda",
    "angin", "tumbuh", "jalan", "bunga", "merah", "kecil", "besar", "rindu"
];

// Fungsi untuk generate teks acak
function getRandomText(wordCount = 30) {
    let textArr = [];
    for (let i = 0; i < wordCount; i++) {
        const randomIndex = Math.floor(Math.random() * wordBank.length);
        textArr.push(wordBank[randomIndex]);
    }
    return textArr.join(" ");
}

let charArray = [];
let typedChars = [];

let currentIndex = 0;

// Timer & WPM
let startTime = null;
let timerInterval = null;

// Durasi (detik) yang dipilih
let timeLimit = 30;
let timeLeft = timeLimit;

// Inisialisasi pertama
initTest();

/* ========== FUNGSI INIT ========== */
function initTest() {
    const selectEl = document.getElementById('timeSelect');
    timeLimit = parseInt(selectEl.value);
    timeLeft = timeLimit;

    currentIndex = 0;
    const randomText = getRandomText(30);
    charArray = randomText.split('');
    typedChars = new Array(charArray.length).fill(undefined);

    startTime = null;
    clearInterval(timerInterval);

    document.getElementById('result').textContent = '';
    document.getElementById('restartBtn').style.display = 'none';

    const wordsContainer = document.getElementById('wordsContainer');
    wordsContainer.innerHTML = '';

    charArray.forEach((ch) => {
        const span = document.createElement('span');
        span.className = 'letter untyped';
        span.textContent = ch;
        wordsContainer.appendChild(span);
    });

    // Fokus ke input tersembunyi
    const hiddenInput = document.getElementById('hiddenInput');
    hiddenInput.focus();

    updateDisplay();
}

/* ========== EVENT KEYDOWN ========== */
document.addEventListener('keydown', (e) => {
    const hiddenInput = document.getElementById('hiddenInput');
    hiddenInput.focus();

    if (!startTime && isAcceptableKey(e)) {
        startTime = Date.now();
        // Mulai hitung mundur
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft <= 0) {
                finishTest();
            }
        }, 1000);
    }

    switch (e.key) {
        case 'ArrowLeft':
            if (currentIndex > 0) {
                currentIndex--;
                updateDisplay();
            }
            e.preventDefault();
            break;
        case 'ArrowRight':
            if (currentIndex < charArray.length) {
                currentIndex++;
                updateDisplay();
            }
            e.preventDefault();
            break;
        case 'Backspace':
            if (currentIndex > 0) {
                typedChars[currentIndex - 1] = undefined;
                currentIndex--;
                updateDisplay();
            }
            e.preventDefault();
            break;
        case 'Enter':
            finishTest();
            e.preventDefault();
            break;
        default:
            if (isAcceptableKey(e)) {
                if (currentIndex < charArray.length) {
                    typedChars[currentIndex] = e.key;
                    currentIndex++;
                    updateDisplay();
                }
                e.preventDefault();
            }
            break;
    }
});

/* ========== FUNGSI CEK KEY YANG DITERIMA ========== */
function isAcceptableKey(e) {
    return e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}

/* ========== UPDATE TAMPILAN HURUF & CURSOR ========== */
function updateDisplay() {
    const letterSpans = document.querySelectorAll('.letter');

    for (let i = 0; i < charArray.length; i++) {
        const span = letterSpans[i];
        const typed = typedChars[i];

        span.classList.remove('untyped', 'correct', 'incorrect');

        if (typed === undefined) {
            span.classList.add('untyped');
        } else {
            if (typed === charArray[i]) {
                span.classList.add('correct');
            } else {
                span.classList.add('incorrect');
            }
        }
    }

    document.querySelectorAll('.cursor').forEach((el) => el.remove());

    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    if (currentIndex < charArray.length) {
        const targetSpan = letterSpans[currentIndex];
        targetSpan.parentNode.insertBefore(cursor, targetSpan);
    } else {
        const wordsContainer = document.getElementById('wordsContainer');
        wordsContainer.appendChild(cursor);
    }
}

/* ========== UPDATE TIMER (COUNTDOWN) ========== */
function updateTimer() {
    document.getElementById('result').textContent = `Time Left: ${timeLeft}s`;
}

/* ========== FINISH TEST ========== */
function finishTest() {
    clearInterval(timerInterval);

    let totalTyped = 0;
    let totalCorrect = 0;
    for (let i = 0; i < charArray.length; i++) {
        if (typedChars[i] !== undefined) {
            totalTyped++;
            if (typedChars[i] === charArray[i]) {
                totalCorrect++;
            }
        }
    }

    // Hitung WPM (net = huruf benar / 5, per menit)
    const totalTime = startTime ? ((Date.now() - startTime) / 1000) : 1;
    const netCharacters = totalCorrect;
    const netWPM = Math.floor((netCharacters / 5) / (totalTime / 60));

    const accuracy = totalTyped > 0
        ? Math.floor((totalCorrect / totalTyped) * 100)
        : 0;

    document.getElementById('result').innerHTML = `
        <div>Time's up or Test finished!</div>
        <div>WPM: ${netWPM}</div>
        <div>Accuracy: ${accuracy}%</div>
      `;
    document.getElementById('restartBtn').style.display = 'inline-block';
}

// Tombol restart
document.getElementById('restartBtn').addEventListener('click', () => {
    clearInterval(timerInterval);
    initTest();
});
