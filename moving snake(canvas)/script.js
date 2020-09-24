
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

function init()
{
    canvas.height = innerHeight;
    canvas.width = innerWidth;
}
init();

addEventListener('resize',init);

class Circle {
    constructor(x,y,radius,color)
    {   
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    
    

    update(){
        const last = {x:this.x ,y:this.y};
         this.x += (Math.random()-0.5) *20;
       this.y += (Math.random()-0.5) *20;
        this.draw(last);
      
    }
    draw(last){

        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(last.x,last.y);
        c.lineTo(this.x,this.y);
        c.lineCap = 'round';
        c.lineJoin = 'round';
        c.stroke();
        c.closePath();
    }
}

const circleArray = [];

for( let i=0;i<1;i++)
{
    const X = canvas.width/2;
    const Y = canvas.height/2;
    circleArray.push(new Circle(X,Y,18,'blue'));
}

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(240,240,255,0.04)';
    c.fillRect(0,0,innerWidth,innerHeight);

    circleArray.forEach(circle=>{
        circle.update();
    })
}
animate();