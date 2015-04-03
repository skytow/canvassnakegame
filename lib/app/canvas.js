var _ = require('underscore');
var screen = require('./screen');
var game = require('./game');
var scaleFactor = screen.getScaleFactor();

var scale = function (screen) {
    var scaleFactor = screen.getScaleFactor();
    if (scaleFactor > 1) {
        var oldWidth = screen.canvas.width;
        var oldHeight = screen.canvas.height;
        screen.canvas.width = screen.canvas.width * scaleFactor;
        screen.canvas.height = screen.canvas.height * scaleFactor;
        screen.canvas.style.width = oldWidth + 'px';
        screen.canvas.style.height = oldHeight + 'px';
        screen.context.scale(scaleFactor, scaleFactor);
    }
};
exports.scale = scale;

var refreshCanvas = function (screen) {
    screen.context.fillStyle = 'black';
    screen.context.fillRect(0, 0, screen.canvas.width, screen.canvas.height);
};
exports.refreshCanvas = refreshCanvas;
var food = function (x, y, radius, fillCircle) {
    screen.context.beginPath();
    screen.context.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        screen.context.fill();
    } else {
        screen.context.stroke();
    }
};
exports.drawBox = function (xBox, yBox, boxColor) {
    var x = xBox * screen.blockSize;
    var y = yBox * screen.blockSize;
    screen.context.fillStyle = boxColor;
    screen.context.fillRect(x, y, screen.blockSize, screen.blockSize);
};
exports.drawFood = function (xBox, yBox,  boxColor) {
    var cxBox = xBox * screen.blockSize + screen.blockSize / 2;
    var cyBox = xBox * screen.blockSize + screen.blockSize / 2;
    screen.context.fillStyle = boxColor;
    food(cxBox, cyBox, boxColor / 2, true);
};
var drawScore = function () {
    screen.context.textAlign = 'left';
    screen.context.textBaseline = 'top';
    screen.context.fillStyle = 'red';
    screen.context.font = (screen.canvas.height / 35 / scaleFactor) + 'pt Impact';
    screen.context.fillText('Score: ' + game.settings.score, 10, 10);
    screen.context.fillText('Top Score: ' + game.settings.topScore, 90, 10);
};

var drawMessage = function () {
    screen.context.textAlign = 'center';
    screen.context.fillText("Click and use arrow keys to move snake!",
        screen.canvas.width / 2 / scaleFactor, screen.canvas.height / 4 / scaleFactor);
    screen.context.fillText("Feed the Snake!",
        screen.canvas.width / 2 / scaleFactor, screen.canvas.height / 2 / scaleFactor);

};
exports.edges = function(){
    return {
        width: screen.canvas.width / scaleFactor / screen.blockSize,
        height: screen.canvas.height / scaleFactor / screen.blockSize
    };
};
var paintCanvas = function () {
    _.extend(screen.context, {
        fillStyle: 'white',
        font: (screen.canvas.height / 28 / scaleFactor) + 'pt helvetica'
    });
    drawMessage();
    drawScore();
};

exports.paintCanvas = paintCanvas;
exports.drawScore = drawScore;
exports.drawMessage = drawMessage;

