var _ = require('underscore');
var food = {
    x: 0,
    y: 0,
    color: '#0FF'
};

var drawFood = function (boxHeight, boxWidth, snakeSections) {
    var foodX, foodY;

    var minX = Math.min(_.first(snakeSections).x, _.last(snakeSections).x);
    var maxX = Math.max(_.first(snakeSections).x, _.last(snakeSections).x);
    var minY = Math.min(_.first(snakeSections).y, _.last(snakeSections).y);
    var maxY = Math.max(_.first(snakeSections).y, _.last(snakeSections).y);

    var locationOK = false;

    while (!locationOK){
        foodX = Math.ceil(Math.random() * (boxWidth - 3)) + 1;
        foodY = Math.ceil(Math.random() * (boxHeight - 3)) + 1;

        if ((foodX < (minX - 5) || foodX > (maxX + 5)) &&
            (foodY < (minY - 5) || foodY > (maxY + 5))){
            locationOK = true;
        }
    }

    food.x = foodX;
    food.y = foodY;
    return;
};

exports.drawFood = drawFood;
exports.food = food;
