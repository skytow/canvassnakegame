var _ = require('underscore');
var screen = require('./screen');
var game = require('./game');
var scaleFactor = screen.getScaleFactor();

var scale = function (screen) {
    var scaleFactor = screen.getScaleFactor();
    if (scaleFactor > 1) {
        var oldWidth = screen.canvasElement.width;
        var oldHeight = screen.canvasElement.height;
        screen.canvasElement.width = screen.canvasElement.width * scaleFactor;
        screen.canvasElement.height = screen.canvasElement.height * scaleFactor;
        screen.canvasElement.style.width = oldWidth + 'px';
        screen.canvasElement.style.height = oldHeight + 'px';
        screen.context.scale(scaleFactor, scaleFactor);
    }
};
exports.scale = scale;

var refreshCanvas = function (screen) {
    screen.context.fillStyle = 'black';
    screen.context.fillRect(0, 0, screen.canvasElement.width, screen.canvasElement.height);
};
exports.refreshCanvas = refreshCanvas;

exports.drawBox = function (xBox, yBox, boxSize, boxColor) {
    screen.context.fillStyle = boxColor;
    screen.context.beginPath();
    screen.context.moveTo(xBox - (boxSize / 2), yBox - (boxSize / 2));
    screen.context.lineTo(xBox + (boxSize / 2), yBox - (boxSize / 2));
    screen.context.lineTo(xBox + (boxSize / 2), yBox + (boxSize / 2));
    screen.context.lineTo(xBox - (boxSize / 2), yBox + (boxSize / 2));
    screen.context.closePath();
    screen.context.fill();
};
var drawScore = function () {
    screen.context.textAlign = 'left';
    screen.context.textBaseline = 'top';
    screen.context.fillStyle = 'red';
    screen.context.font = (screen.canvasElement.height / 40 / scaleFactor) + 'pt Impact';
    screen.context.fillText('Score: ' + game.settings.score, 10, 10);
    screen.context.fillText('Top Score: ' + game.settings.topScore, 90, 10);
};

var drawMessage = function () {
    screen.context.textAlign = 'center';
    screen.context.fillText("Click to play!",
        screen.canvasElement.width / 2 / scaleFactor, screen.canvasElement.height / 5 / scaleFactor);
    screen.context.fillText("Use Arrow keys to control the snake",
        screen.canvasElement.width / 2 / scaleFactor, screen.canvasElement.height / 4 / scaleFactor);
    screen.context.fillText("Feed the Snake!",
        screen.canvasElement.width / 2 / scaleFactor, screen.canvasElement.height / 3 / scaleFactor);

};
var paintCanvas = function () {
    _.extend(screen.context, {
        fillStyle: 'white',
        font: (screen.canvasElement.height / 28 / scaleFactor) + 'pt helvetica'
    });
    drawMessage();
    drawScore();
};

exports.paintCanvas = paintCanvas;
exports.drawScore = drawScore;
exports.drawMessage = drawMessage;

