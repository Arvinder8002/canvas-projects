const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let alpha = 1;
canvas.height = innerHeight;
canvas.width = innerWidth;
let click = false;
//event
addEventListener('mousedown',()=>{
   click = true;
   console.log(click)
})

//event
addEventListener('mouseup',()=>{
    click = false;
   console.log(click)

 })
class Particle{
    constructor(x,y,radius,color)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw()
    {
        c.beginPath();
        c.shadowColor = this.color;
        c.shadowBlur = 10;
       c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();

    }

    update()
    {
        
        this.draw();
    }
}

let particles = [];
 
for(let i=0;i<500;i++)
{
    const X = (Math.random()*innerWidth-innerWidth/2 ) ;
    const Y = (Math.random()*innerHeight*2-innerHeight*2/2);
    particles.push(new Particle(X,Y,Math.random()*3,`hsl(${Math.random()*360},50%,50%)`));
}
let radians=0;
let value=0.001;
function animate()
{
    requestAnimationFrame(animate);
    c.fillStyle = `rgba(0,0,0,${alpha})`;
    c.fillRect(0,0,canvas.width,canvas.height);
    c.save();
    c.translate(canvas.width/2,canvas.height/2);
    c.rotate(radians);
    particles.forEach( particle=>{
        particle.update();
    })
    c.restore();
    radians += 0.001;
    
    if(click){
        radians += value;
    } 
    value +=0.00001;
    if(click && alpha>0.1)
    {
        alpha -= 0.01;
       
       
    }
    else if(!click && alpha<1)
    {
        alpha +=0.01;  
    }
    
}
animate();