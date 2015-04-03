var _ = require('underscore');
var canvas = require('./canvas');
var snake = {};

exports.initialize = function () {
    _.extend(snake, {
        length: 5,
        color: '#0F0',
        direction: 'right',
        sections: []
    });
    for (var i = 0; i < snake.length; i++){
        snake.sections.push({x:i, y:0});
    }
};

var drawSection = function (section) {
    var x = section.x;
    var y = section.y;
    canvas.drawBox(x, y, snake.color);
};

exports.draw = function () {
    _.each(snake.sections, function (section) {
        drawSection(section);
    });
};

exports.checkCollision = function(boxHeight, boxWidth){
    var head = _.last(snake.sections);
    if (head.x < 0 || head.x > boxWidth){
        return true;
    }
    if (head.y < 0 || head.y > boxHeight){
        return true;
    }
    for (var i = 0; i < snake.length - 1; i++){
        if (head.x === snake.sections[i].x && head.y === snake.sections[i].y) {
            return true;
        }
    }
    return false;
};

var moveSnake = function () {
    var headX = _.last(snake.sections).x;
    var headY = _.last(snake.sections).y;
    switch (snake.direction) {
        case 'up':
            headY--;
            break;
        case 'down':
            headY++;
            break;
        case 'left':
            headX--;
            break;
        case 'right':
            headX++;
            break;
    }
    var tailSection = snake.sections.shift();
    tailSection.x = headX;
    tailSection.y = headY;
    snake.sections.push(tailSection);
};
exports.grow = function() {
    var tailX = _.first(snake.sections).x;
    var tailY = _.first(snake.sections).y;
    moveSnake();
    snake.sections.unshift({
        x: tailX,
        y: tailY
    });
    snake.length++;
};

exports.ateFood = function(food){
    var head = _.last(snake.sections);
    return (head.x === food.x && head.y === food.y);
};

exports.snake = snake;
exports.moveSnake = moveSnake;