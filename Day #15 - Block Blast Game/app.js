const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const restartBtn = document.getElementById('restartBtn');

const paddle = {
    width: 100,
    height: 15,
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    speed: 8,
    color: '#FF5722'
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    radius: 10,
    speedX: 5,
    speedY: -5,
    active: false,
    color: '#4CAF50'
};

let score = 0;
let lives = 3;
const blockWidth = 75;
const blockHeight = 20;
const blockPadding = 10;
const blockOffsetTop = 30;
const blockOffsetLeft = 30;
const blockRows = 5;
const blockCols = 9;

let blocks = [];
for (let c = 0; c < blockCols; c++) {
    blocks[c] = [];
    for (let r = 0; r < blockRows; r++) {
        blocks[c][r] = { x: 0, y: 0, active: true };
    }
}

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    paddle.x = e.clientX - rect.left - paddle.width / 2;
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
});

canvas.addEventListener('click', () => {
    if (!ball.active) {
        ball.active = true;
    }
});

restartBtn.addEventListener('click', () => {
    resetGame();
    restartBtn.style.display = 'none';
});

function resetGame() {
    score = 0;
    lives = 3;
    ball.active = false;
    scoreElement.textContent = score;
    livesElement.textContent = lives;

    for (let c = 0; c < blockCols; c++) {
        for (let r = 0; r < blockRows; r++) {
            blocks[c][r].active = true;
        }
    }

    ball.x = canvas.width / 2;
    ball.y = canvas.height - 50;
    ball.speedY = -5;
}

function collisionDetection() {
    for (let c = 0; c < blockCols; c++) {
        for (let r = 0; r < blockRows; r++) {
            const b = blocks[c][r];
            if (b.active) {
                if (ball.x > b.x && ball.x < b.x + blockWidth &&
                    ball.y > b.y && ball.y < b.y + blockHeight) {
                    ball.speedY = -ball.speedY;
                    b.active = false;
                    score += 10;
                    scoreElement.textContent = score;
                }
            }
        }
    }
}

function drawPaddle() {
    ctx.fillStyle = paddle.color;
    roundRect(ctx, paddle.x, paddle.y, paddle.width, paddle.height, 10);
    ctx.fill();
}

function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function drawBlocks() {
    for (let c = 0; c < blockCols; c++) {
        for (let r = 0; r < blockRows; r++) {
            if (blocks[c][r].active) {
                const blockX = c * (blockWidth + blockPadding) + blockOffsetLeft;
                const blockY = r * (blockHeight + blockPadding) + blockOffsetTop;
                blocks[c][r].x = blockX;
                blocks[c][r].y = blockY;
                ctx.fillStyle = "#9796f0";
                roundRect(ctx, blockX, blockY, blockWidth, blockHeight, 5);
                ctx.fill();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawBlocks();

    if (ball.active) {
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.speedX = -ball.speedX;
        }
        if (ball.y - ball.radius < 0) {
            ball.speedY = -ball.speedY;
        }
        if (ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width) {
            ball.speedY = -ball.speedY;
        }

        if (ball.y + ball.radius > canvas.height) {
            lives--;
            livesElement.textContent = lives;
            if (lives === 0) {
                restartBtn.style.display = 'block';
                ball.active = false;
                return;
            }
            ball.active = false;
            ball.x = canvas.width / 2;
            ball.y = canvas.height - 50;
        }

        collisionDetection();
    }

    requestAnimationFrame(draw);
}

draw();
