// shape：线、线段、矩形、圆形、弧
// 线段
function Line(sx, sy, ex, ey, css){
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
    this.css = css;
}
Line.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.sx, this.sy);
    ctx.lineTo(this.ex, this.ey);
    ctx.lineWidth = this.css.lineWidth || 1;
    ctx.strokeStyle = this.css.strokeStyle || 'black';
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
};

// 矩形
function Rect(x, y, w, h, css) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.css = css;
}
Rect.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    
    ctx.lineWidth = this.css.lineWidth || 1;
    ctx.strokeStyle = this.css.strokeStyle || 'black';
    
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
};
Rect.prototype.fill = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.css.fillStyle || 'white';
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
};

function Circle(x, y, r, start, end, css){
    this.x = x;
    this.y = y;
    this.r = r;
    this.start = start;
    this.end = end;
    this.css = css || {};
}

Circle.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, this.start, this.end);
    
    ctx.lineWidth = this.css.lineWidth || 1;
    ctx.strokeStyle = this.css.strokeStyle || 'black';
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
};
Circle.prototype.fill = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.css.fillStyle || 'white';
    ctx.arc(this.x, this.y, this.r, this.start, this.end);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};
Circle.prototype.clip = function(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, this.start, this.end);
    ctx.closePath();
    ctx.clip();
};

function Picture(url, sx, sy, sw, sh, dx, dy, dw, dh){
    this.url = url;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.dw = dw;
    this.dh = dh;
}
Picture.prototype.draw = function(ctx){
    var img = new Image();
    img.src = this.url;
    var self = this;
    this.img = img; // 让 this 持有当前图片
    img.onload = function(){
        ctx.save();
        if(!self.sw) {
            ctx.drawImage(img, self.sx, self.sy);
        } else if(!self.dx){
            ctx.drawImage(img, self.sx, self.sy, self.sw, self.sh);
        } else if(self.dh){
            ctx.drawImage(img, self.sx, self.sy, self.sw, self.sh,
                self.dx, self.dy, self.dw, self.dh);
        }
        ctx.restore();
    };
}
// 刷新图片
Picture.prototype.refresh = function(ctx) {
    ctx.save();
    if(!this.sw) {
        ctx.drawImage(this.img, this.sx, this.sy);
    } else if(!self.dx){
        ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh);
    } else if(self.dh){
        ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh,
            this.dx, this.dy, this.dw, this.dh);
    }
    ctx.restore();
}
// 文字
function Text(txt, x, y, css){
    this.txt = txt;
    this.x = x;
    this.y = y;
    this.css = css;
}
Text.prototype.draw = function(ctx){
    ctx.save();
    ctx.font = this.css.font;
    ctx.fillStyle = this.css.fillStyle;
    ctx.fillText(this.txt, this.x, this.y);
    ctx.restore();
}

const PI2 = Math.PI * 2;
const PI = Math.PI;
const HALF_PI = Math.PI / 2;
const QUATER_PI = Math.PI;


// 路径 path
// var path = {
//     shape : {}, // 数据：线段、矩形、圆形、弧
//     closed : true, // 是否关闭
//     draw : function(ctx, css){
//         ctx.save();
//         ctx.beginPath();

//         ctx.lineWidth = css.lineWidth;
//         ctx.strokeStyle = css.strokeStyle;

//         ctx.stroke();

//         if(this.closed){
//             ctx.closePath();
//         }
//         ctx.restore();
//     },
//     fill : function(ctx, css){
//         ctx.save();
//         ctx.beginPath();

//         ctx.closePath();
//         ctx.fillStyle = css.fillStyle;
//         ctx.fill();

//         ctx.restore();
//     },
    
// }