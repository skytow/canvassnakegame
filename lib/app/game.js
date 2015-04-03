var canvas = require('./canvas');
var snake = require('./snake');
var food = require('./food');
var screen = require('./screen');

var settings = {difficulty: 2, speed: 20, gameover: false, score: 0, topScore:0};
var timer;
var paused = false;

function clearTimer() {
    if (timer) {
        clearTimeout(timer);
    }
}

var setDifficultyLevel = function () {
    if (settings.difficulty === 1) {
        settings.speed = 15;
    }
    if (settings.difficulty === 2) {
        settings.speed = 20;
    }
    if (settings.difficulty === 5) {
        settings.speed = 30;
    }
};

var start = function () {
    snake.initialize();
    food.drawFood(canvas.edges().height, canvas.edges().width, snake.snake.sections);
};

var loadGame = function () {
    clearTimer();
    canvas.refreshCanvas(screen);
    screen.updateTopScore(settings.score);
    canvas.paintCanvas();

};

var mainLoop = function () {
    canvas.refreshCanvas(screen);
    canvas.drawScore();
    snake.moveSnake();
    snake.draw();
    if (snake.checkCollision(canvas.edges().height, canvas.edges().width)){
        setDifficultyLevel();
        canvas.refreshCanvas(screen);
        canvas.paintCanvas();
        return;
    }
    if (snake.isOnFood(food.food)){
        food.drawFood(canvas.edges().height, canvas.edges().width, snake.snake.sections);
        settings.speed += settings.difficulty;
        snake.grow();
        settings.score++;
        screen.updateTopScore(settings.score);
    }

    canvas.drawBox(food.food.x, food.food.y, food.food.color);

    timer = setTimeout(function () {
        screen.requestAnimationFrame(mainLoop);
    }, 1000 / settings.speed);
};

exports.reset = function () {
    canvas.refreshCanvas(screen);
    settings.score = 0;
    settings.gameover = false;
    start();
    clearTimer();
    screen.requestAnimationFrame(mainLoop);
};

exports.togglePause = function () {
    if (paused) {
        paused = false;
        screen.requestAnimationFrame(mainLoop);
    }
    else {
        paused = true;
        clearTimer();
    }
};

exports.loadGame = loadGame;
exports.setDifficultyLevel = setDifficultyLevel;
exports.settings = settings;