var snake = require('./snake');
var canvas = require('./canvas');

var food = {
    size: null,
    x: null,
    y: null,
    color: '#0FF'
};

exports.set = function () {
    food.size = snake.snake.size;
    food.x = (Math.ceil(Math.random() * 10) * snake.snake.size * 4) - snake.snake.size / 2;
    food.y = (Math.ceil(Math.random() * 10) * snake.snake.size * 3) - snake.snake.size / 2;
};

exports.draw = function () {
    canvas.drawBox(food.x, food.y, food.size, food.color);
};
exports.food = food;