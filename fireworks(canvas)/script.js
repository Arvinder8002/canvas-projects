const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 0.01;
const friction = 0.99;


function Particle(x,y,radius,color,velocity)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;

    this.draw = function(){
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }

    this.update = function(){
        this.velocity.y +=gravity;
       this.velocity.x *= friction;
       this.velocity.y *= friction;
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
       
        this.alpha -= 0.005;
        this.draw();
       
        
    }
}
const particleArray = [];
const particleCount = 500;
function init(){
    canvas.height = innerHeight;
    canvas.width = innerWidth;
}
init();

addEventListener('resize',init);

const angle = Math.PI*2 / particleCount;
addEventListener('click',e=>{
const X = e.offsetX;
const Y = e.offsetY;
for(let i=0;i<particleCount;i++)
{
 particleArray.push(new Particle(X,Y,3,`hsl(${Math.random()*360},50%,50%)`,{
    x:Math.cos(angle * i) * Math.random()*7,
y:Math.sin(angle * i)* Math.random()*7})
     );

}
});


function animate()
{
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0,0,0,0.05)';
    c.fillRect(0,0,innerWidth,innerHeight);
    particleArray.forEach((particle,i)=>{
        if(particle.alpha > 0)
        {
            particle.update();
        }
        else{
            particleArray.splice(i,1);
        }
    })

}
animate();