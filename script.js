// Sand Maker

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

var dragging = false;
var positionMouse = { x: 0, y: 0 };
document.addEventListener('mousedown', () => dragging = true);
document.addEventListener('mouseup', () => dragging = false);
window.addEventListener('mousemove', (e) => {
    positionMouse = { x: e.offsetX, y: e.offsetY };
});

window.addEventListener('mousemove', () => {
    // dragging = false;
});

var sizeBox = 20;
var screenMap = [];

for (var i = 0; i < 30; i++) {
    screenMap[i] = [];
    for (var j = 0; j < 50; j++) {
        screenMap[i][j] = 0;
    }
}

function createRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

setInterval(() => {
    if (dragging == true) {
        var randX = Math.floor(positionMouse.x / sizeBox) + createRandom(-1, 1);
        var randy = Math.floor(positionMouse.y / sizeBox) + createRandom(-1, 1);
        screenMap[randy][randX] = 1
    }
    draw();
    update();
}, 20);

function update() {
    for (var j = 0; j < 50; j++) {
        for (var i = 0; i < 30; i++) {
            if (screenMap[i][j] == 1) {
                if (i + 1 < 30 && screenMap[i + 1][j] == 0) {
                    screenMap[i][j] = 0;
                    screenMap[i + 1][j] = 1;
                    i++;
                }
                // else if (i + 1 < 30 && screenMap[i + 1][j] == 1) {
                //     if (screenMap[i][j + 1] == 0) {
                //         screenMap[i][j] = 0;
                //         screenMap[i][j + 1] = 1;
                //     }
                // }
            }
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 50; j++) {
            if (screenMap[i][j] == 1) {
                ctx.beginPath();
                ctx.rect(j * sizeBox, i * sizeBox, sizeBox, sizeBox);
                ctx.stroke();
            }
        }
    }
}