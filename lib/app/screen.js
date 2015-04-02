/*jslint browser: true*/
var game = require('./game');
var canvasElement = document.getElementById("canvas");
exports.context = document.getElementById("canvas").getContext("2d");
exports.small = document.getElementById("small");
exports.medium = document.getElementById("medium");
exports.large = document.getElementById("large");
exports.beginner = document.getElementById("beginner");
exports.novice = document.getElementById("novice");
exports.advanced = document.getElementById("advanced");
exports.textDirection = "right";
exports.textXpos = 320;


function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

exports.getScaleFactor = function () {
    if ('devicePixelRatio' in window) {
        if (window.devicePixelRatio > 1) {
            return window.devicePixelRatio;
        }
    }
    return 1;
};

exports.requestAnimationFrame = function (callback) {
    var animationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame;
    animationFrame.call(window, callback);
};

var updateHighScore = function (score) {
    var topScore = score;
    if (supports_html5_storage()) {
        var localStorageScore = parseInt(localStorage.getItem("topScore"));
        if (!isNaN(localStorageScore)) {
            topScore = Math.max(score, localStorageScore);
        }
        localStorage.setItem("topScore", topScore);
        game.settings.topScore = parseInt(topScore);
    }
};

exports.changeBoardSize = function (boardSize) {
    var pixels = 500;
    if (boardSize === 'small') {
        pixels = 400;
    }
    if (boardSize === 'large') {
        pixels = 600;
    }

    canvasElement.width = pixels;
    canvasElement.height = pixels;
};

exports.updateHighScore = updateHighScore;
exports.canvasElement = canvasElement;
