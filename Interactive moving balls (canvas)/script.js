//variables
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const circeArray = [];
const colors=['red','blue','green','pink','orange','magenta'];
let mouse = {
    x:undefined,
    y:undefined
    
}
//resizing canvas
canvas.height = innerHeight;
canvas.width = innerWidth;

//events
document.addEventListener('mousemove',(e)=>
{
   mouse.x=e.pageX;
   mouse.y=e.pageY;
   console.log(mouse)
});
//circle object
function Circle(x,y,dx,dy,radius)
{
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.color=colors[Math.floor(Math.random()*colors.length)];
    this.draw = function()
    {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
          c.fill();

    }

    this.update = function()
    {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0 )
        {
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0 )
        {
            this.dy = -this.dy;
        }
        

        this.x+=this.dx;
        this.y+=this.dy;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 )
        {
        if(this.radius<50)
        {
            this.radius++;
        }
        }
        else if (this.radius>5)
        {
            this.radius--;
        }


        

        this.draw();
    }
}

for(let j=0;j<600;j++)
{   const x = Math.random()*(innerWidth-100) + 50;
    const y = Math.random()*(innerHeight-100) + 50;
    const dx = (Math.random()-0.5 ) * Math.random()*3; 
    const dy = (Math.random()-0.5) * Math.random()*3;
    circeArray.push(new Circle(x,y,dx,dy,5));
}
function animate()
{
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(let j=0;j<circeArray.length;j++)
{
    circeArray[j].update();
}
}
animate();