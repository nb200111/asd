// Board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// Players
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 10;

let player = {
    x: boardWidth / 2 - playerWidth / 2,
    y: boardHeight - playerHeight - 5,
    width: playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX
};

// Ball
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 4;
let ballVelocityY = 3;

let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
};

// Blocks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3;
let blockMaxRows = 10;
let blockCount = 0;

let blockX = 15;
let blockY = 45;

let score = 0;
let gameOver = false;

// Countdown Timer
let countdown = 3;
let countdownActive = false;
let gameStarted = false; // Check of de game is begonnen

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    createBlocks();
    requestAnimationFrame(update);

    document.addEventListener("keydown", handleKeyPress);
};

// ** Key handler voor zowel starten als bewegen **
function handleKeyPress(e) {
    if (e.code === "Space") {
        if (gameOver) {
            resetGame();
        } else if (!gameStarted) {
            countdownActive = true;
            gameStarted = true;
            startCountdown();
        }
    }

    // ** Beweging mag pas na de countdown **
    if (!countdownActive && !gameOver) {
        movePlayer(e);
    }
}

function startCountdown() {
    let countdownInterval = setInterval(() => {
        if (countdown > 0) {
            countdown--;
        } else {
            clearInterval(countdownInterval);
            countdownActive = false; // Start het spel
        }
    }, 1000);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) return;

    context.clearRect(0, 0, board.width, board.height);

    // Wacht met starten tot spatie is gedrukt
    if (!gameStarted) {
        context.fillStyle = "white";
        context.font = "20px Arial";
        context.fillText("Druk op spatie om te starten", boardWidth / 2 - 110, boardHeight / 2);
        return;
    }

    // Toon countdown en stop spel tot het aftellen klaar is
    if (countdownActive) {
        context.fillStyle = "white";
        context.font = "30px Arial";
        context.fillText(countdown > 0 ? countdown : "GO!", boardWidth / 2 - 20, boardHeight / 2);
        return;
    }

    // Player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    // Ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // Ball collisions
    if (topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.velocityY *= -1;
    } else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1;
    }

    if (ball.y <= 0) { 
        ball.velocityY *= -1;
    } else if (ball.x <= 0 || (ball.x + ball.width >= boardWidth)) {
        ball.velocityX *= -1;
    } else if (ball.y + ball.height >= boardWidth) {
        context.font = "20px sans-serif";
        context.fillText("Game Over: Druk op spatie om te herstarten", 80, 400);
        gameOver = true;
    }

    // Blocks
    context.fillStyle = "skyblue";
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true;
                ball.velocityY *= -1;
                score += 100;
                blockCount -= 1;
            } else if (leftCollision(ball, block) || rightCollision(ball, block)) {
                block.break = true;
                ball.velocityX *= -1;
                score += 100;
                blockCount -= 1;
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }

    // Next level
    if (blockCount == 0) {
        score += 100 * blockRows * blockColumns;
        blockRows = Math.min(blockRows + 1, blockMaxRows);
        createBlocks();
    }

    // Score
    context.font = "20px sans-serif";
    context.fillText(score, 10, 25);
}

function movePlayer(e) {
    if (gameOver) return;

    if (e.code == "ArrowLeft") {
        let nextplayerX = player.x - player.velocityX;
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX;
        }
    } else if (e.code == "ArrowRight") {
        let nextplayerX = player.x + player.velocityX;
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function topCollision(ball, block) {
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block) {
    return detectCollision(ball, block) && (block.y + block.height) <= ball.y;
}

function leftCollision(ball, block) {
    return detectCollision(ball, block) && (ball.x + ball.width) <= block.x;
}

function rightCollision(ball, block) {
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}

function outOfBounds(xPosition) {
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function createBlocks() {
    blockArray = [];
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            let block = {
                x: blockX + c * blockWidth + c * 10,
                y: blockY + r * blockHeight + r * 10,
                width: blockWidth,
                height: blockHeight,
                break: false
            };
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}

function resetGame() {
    gameOver = false;
    countdown = 3;
    countdownActive = false;
    gameStarted = false;

    player = {
        x: boardWidth / 2 - playerWidth / 2,
        y: boardHeight - playerHeight - 5,
        width: playerWidth,
        height: playerHeight,
        velocityX: playerVelocityX
    };

    ball = {
        x: boardWidth / 2,
        y: boardHeight / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX: ballVelocityX,
        velocityY: ballVelocityY
    };

    blockArray = [];
    blockRows = 3;
    score = 0;
    createBlocks();
}