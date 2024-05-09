let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');

let snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
];

let food = {
    x: 20,
    y: 20
};

let score = 0;

let direction = 'RIGHT';

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            direction = 'UP';
            break;
        case 'ArrowDown':
            direction = 'DOWN';
            break;
        case 'ArrowLeft':
            direction = 'LEFT';
            break;
        case 'ArrowRight':
            direction = 'RIGHT';
            break;
    }
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * 20, snake[i].y * 20, 20, 20);
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

function drawScore() {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, 10, 10);
}

function updateSnake() {
    let head = {
        x: snake[0].x,
        y: snake[0].y
    };

    switch (direction) {
        case 'UP':
            head.y--;
            break;
        case 'DOWN':
            head.y++;
            break;
        case 'LEFT':
            head.x--;
            break;
        case 'RIGHT':
            head.x++;
            break;
    }

    snake.unshift(head);

    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            alert('Game Over!');
            return true;
        }
    }

    if (snake[0].x < 0 || snake[0].x > 19 || snake[0].y < 0 || snake[0].y > 19) {
        alert('Game Over!');
        return true;
    }

    return false;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSnake();
    drawFood();
    drawScore();

    updateSnake();

    if (checkCollision()) {
        return;
    }

    setTimeout(gameLoop, 1000 / 10);
}

gameLoop();
