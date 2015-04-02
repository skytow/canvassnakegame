var _ = require('underscore');
var canvas = require('./canvas');
var game = require('./game');
var food = require('./food');
var screen = require('./screen');

var snake = {};

exports.initialize = function () {
    _.extend(snake, {
        size: screen.canvasElement.width / 40,
        x: null,
        y: null,
        color: '#0F0',
        direction: 'left',
        sections: []
    });
    snake.sections = [];
    snake.direction = 'left';
    snake.x = screen.canvasElement.width / 2 + snake.size / 2;
    snake.y = screen.canvasElement.width / 2 + snake.size / 2;
    for (var i = snake.x + (5 * snake.size); i >= snake.x; i -= snake.size) {
        snake.sections.push(i + ',' + snake.y);
    }
};

var drawSection = function (section) {
    var x = parseInt(section[0]);
    var y = parseInt(section[1]);
    canvas.drawBox(x, y, snake.size, snake.color);
};

exports.draw = function () {
    _.each(snake.sections, function (section) {
        drawSection(section.split(','));
    });
};

var isCollision = function (x, y) {
    if (x < snake.size / 2 ||
        x > screen.canvasElement.width ||
        y < snake.size / 2 ||
        y > screen.canvasElement.height ||
        snake.sections.indexOf(x + ',' + y) >= 0) {
        return true;
    }
};
var checkCollision = function () {
    if (isCollision(snake.x, snake.y) === true) {
        game.settings.gameover = true;
        screen.updateHighScore(game.settings.score);
    }
};

var checkGrowth = function () {
    if (snake.x === food.food.x && snake.y === food.food.y) {
        game.settings.score++;
        game.settings.speed += game.settings.difficulty;
        food.set();
    } else {
        snake.sections.shift();
    }
};

var move = function () {
    switch (snake.direction) {
        case 'up':
            snake.y -= snake.size;
            break;
        case 'down':
            snake.y += snake.size;
            break;
        case 'left':
            snake.x -= snake.size;
            break;
        case 'right':
            snake.x += snake.size;
            break;
    }
    checkCollision();
    checkGrowth();
    snake.sections.push(snake.x + ',' + snake.y);
};

exports.checkCollision = checkCollision;
exports.snake = snake;
exports.move = move;