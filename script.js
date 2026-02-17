const canvas = document.getElementById('portraitCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const text = "I love you";

const img = new Image();
img.src = 'https://i.postimg.cc/GtQz3s0n/herpicture-jpg.jpg'; // you can replace this with your own image URL

img.onload = function() {
    const hiddenCanvas = document.createElement('canvas');
    const hiddenCtx = hiddenCanvas.getContext('2d');

    hiddenCanvas.width = 200;
    hiddenCanvas.height = 200;

    hiddenCtx.drawImage(img, 0, 0, hiddenCanvas.width, hiddenCanvas.height);

    const imageData = hiddenCtx.getImageData(0, 0, hiddenCanvas.width, hiddenCanvas.height);
    const pixels = imageData.data;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';

    const cellSize = 6;

    for (let y = 0; y < hiddenCanvas.height; y++) {
        for (let x = 0; x < hiddenCanvas.width; x++) {
            const index = (y * hiddenCanvas.width + x) * 4;
            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];

            const brightness = (r + g + b) / 3;

            const fontSize = (1 - brightness / 255) * cellSize * 2;
            ctx.font = `${fontSize}px monospace`;

            ctx.fillText(text, x * cellSize, y * cellSize);
        }
    }
}
