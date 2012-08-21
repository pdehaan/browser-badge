var fs = require('fs');

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

var browsers = [ 'explorer', 'chrome', 'safari', 'firefox', 'opera' ];
browsers.forEach(function (browser, ix) {
    var file = __dirname + '/static/' + browser + '.png';
    var data = fs.readFileSync(file, 'base64');
    var img = new Canvas.Image;
    img.src = 'data:image/png;base64,' + data;
    
    var x = 5 + 51 * ix + (51 - img.width * 0.6) / 2;
    var w = img.width * 0.6;
    var h = img.height * 0.6;
    ctx.drawImage(img, x, 10, w, h);
});

var s = canvas.createPNGStream();
s.pipe(fs.createWriteStream('round.png'));
