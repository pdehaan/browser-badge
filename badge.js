var Canvas = require('canvas');
var canvas = new Canvas(262, 120);
var ctx = canvas.getContext('2d');

function round (x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x, y + r);
    
    for (var angle = 0; angle <= 2 * Math.PI; angle += Math.PI / 2) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        
        ctx.arcTo(x, y, x + w * c, y + h * s, r);
        ctx.lineTo(x + c * r, y + s * r);
        
        x += c * w;
        y += s * h;
    }
    ctx.closePath();
}
 
ctx.fillStyle = 'rgb(191,191,191)';
round(0, 0, 262, 120, 20);
ctx.fill();

ctx.fillStyle = 'rgb(31,31,31)';
round(2, 2, 262 - 4, 120 - 4, 20);
ctx.fill();

var s = canvas.createPNGStream();
var fs = require('fs');
s.pipe(fs.createWriteStream('round.png'));
