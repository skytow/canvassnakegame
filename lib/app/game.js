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
    food.set();
};

var loadGame = function () {
    clearTimer();
    canvas.refreshCanvas(screen);
    screen.updateHighScore(settings.score);
    canvas.paintCanvas();

};

var mainLoop = function () {
    canvas.refreshCanvas(screen);
    canvas.drawScore();
    snake.move();
    food.draw();
    snake.draw();
    if(settings.gameover){
        setDifficultyLevel();
        canvas.refreshCanvas(screen);
        canvas.paintCanvas();
        return;
    }

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