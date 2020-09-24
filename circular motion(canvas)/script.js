const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let particles = [];
const particleCount = 80;

function init()
{
    canvas.width = innerWidth;
    canvas.height = innerHeight; 

    //creating particles
    particles = [];
    for(let i=0;i<particleCount;i++)
    {
        particles.push(new Particle(canvas.width/2,canvas.height/2,rand(2.7,1.7),`hsl(${rand(360,50)},60%,50%)`));
    }

}
init();
window.addEventListener('resize',init);
   
const mouse = {
    x:canvas.width/2,
    y:canvas.height/2
};
window.addEventListener('mousemove',e =>{
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
})

function Particle(x,y,radius,color)
{
    
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radian = rand(6.24,0);
        this.velocity = rand(0.03,0.025);
        this.distanceFromCentre = rand(130,50);
        this.lastMouse = {
            x:x,
            y:y
        };

    this.draw = function(lastPoints)
    {
        c.beginPath();
        c.moveTo(lastPoints.x,lastPoints.y);
        c.lineTo(this.x,this.y);
        c.lineWidth = this.radius;
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }

    this.update = function()
    {   
      
        this.radian += this.velocity;
        const lastPoints ={
            x : this.x,
            y : this.y
            };
        this.lastMouse.x  += (mouse.x - this.lastMouse.x) * 0.06;
        this.lastMouse.y  += (mouse.y - this.lastMouse.y) * 0.06;

        this.x =  this.lastMouse.x + Math.cos(this.radian) *  this.distanceFromCentre;
        this.y =  this.lastMouse.y  + Math.sin(this.radian) * this.distanceFromCentre;
       
        this.draw(lastPoints);
     
        
    }
}


function animate()
{
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255,255,255,0.05)'
    c.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach(particle =>{
        particle.update();
    })

}
animate();

//random functiion
function rand(max,min)
{
return (Math.random() * (max-min)) + min;
}