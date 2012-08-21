var Canvas = require('canvas');
var canvas = new Canvas(262, 120);
var ctx = canvas.getContext('2d');

ctx.lineWidth = 4;
ctx.strokeStyle = 'green';

var w = 262, h = 120, r = 40;

var x = 0, y = 0;
ctx.moveTo(x, y + r);

for (var angle = 0; angle <= 2 * Math.PI; angle += Math.PI / 2) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    
    ctx.arcTo(x, y, x + w * c, y + h * s, r);
    ctx.lineTo(x + c * r, y + s * r);
    
    x += c * w;
    y += s * h;
}

ctx.stroke();

var s = canvas.createPNGStream();
var fs = require('fs');
s.pipe(fs.createWriteStream('badge.png'));
