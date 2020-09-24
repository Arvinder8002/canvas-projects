const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let stars = [],starCount = 1;
let subStars = [];
let skyStars = [];
let randGenerate = 0;



class Star
{
    constructor(x,y,radius,color)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x: rand(3,-3),
            y:1
        }
        this.friction = 0.6;
        this.gravity = 0.5;
    }

    draw()
    {   
        c.save();
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2);
        c.fillStyle = this.color;
        c.shadowColor = this.color;
        c.shadowBlur = 8;
        c.fill();
        c.closePath();
        c.restore();
    }
    
    scatter()
    {
        for(let i=0;i<7;i++)
        {
            subStars.push(new SubStar(this.x,this.y,rand(2,3),'white'));
        }
    }

    update()
    { 
        if(this.x + this.radius + this.velocity.x >= canvas.width || 
            this.x - this.radius < 0)
        {
            this.velocity.x = -this.velocity.x;
            this.scatter();
        }

        if(this.y + this.velocity.y + this.radius >= canvas.height)
        {
            this.velocity.y = -this.velocity.y * this.friction;
            this.radius -= 3;
            this.scatter();

        }
        else
        {
            this.velocity.y += this.gravity;
        }

        this.y += this.velocity.y;
        this.x += this.velocity.x;
        this.draw();
       
    }
}

class SubStar
{
    constructor(x,y,radius,color)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x: rand(3,-3),
            y: rand(10,3)
        }
        this.ttl = 100;
        this.friction = 0.7;
        this.gravity = 0.3;
        this.opacity = 1;
    }

    draw()
    {  c.save();
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2);
        c.fillStyle = `rgba(255,255,255,${this.opacity})`;
        c.shadowColor = this.color;
        c.shadowBlur = 2;
        c.fill();
        c.closePath();
        c.restore();
    }

    update()
    {
        this.draw();
        if(this.y + this.velocity.y + this.radius >= canvas.height)
        {
            this.velocity.y = -this.velocity.y * this.friction;

        }
        else
        {
            this.velocity.y += this.gravity;
        }

        this.y += this.velocity.y;
        this.x += this.velocity.x;
        this.ttl -= 1;
        this.opacity -= 0.01;
       
    }
}
  
function fallinStarGenerator()
{
    
        for (let i = 0; i < starCount; i++) {
        
            stars.push(new Star(rand(canvas.width-10,20),-20,18,'white'));
        }
}


 
//generating mountains
// function createMountains(amount,height,color)
// {
//    let mountainWidth = canvas.width / amount;
//     for(let i=0;i<amount;i++)
// {
//     c.beginPath();
//     c.moveTo(i * mountainWidth,canvas.height);
//     c.lineTo(i * mountainWidth + mountainWidth + 100,canvas.height );
//     c.lineTo(i * mountainWidth + mountainWidth/2,height);
//     c.lineTo(i * mountainWidth - 100,canvas.height);
//     c.fillStyle = color;
//     c.fill();
//     c.closePath();
// }
// }

  //generating the skystars


function animate()
{
    requestAnimationFrame(animate);
    c.fillStyle = `rgba(0,0,0,0.8)`;
    c.fillRect(0,0,canvas.width,canvas.height);
    randGenerate ++;
     
    skyStars.forEach(skyStar=>{
        skyStar.draw();
        });
  
  
    
    //generating the falling stars
    if( randGenerate % 90 ===0)
    {
        fallinStarGenerator();
    }
    //removing falling stars when the radius is zero
    stars.forEach((star,i) => {
        star.update();
        if(star.radius <= 0)
        {
            stars.splice(i,1);
        }
    });
    //removing the substars 
    subStars.forEach((subStar,i) => {
        subStar.update();
        if(subStar.ttl <= 0)
        {
            subStars.splice(i,1);
        }
    }); 
  
}
animate();

// generating sky stars
function generateSkyStars()
{  skyStars = [];
    for( let i=0; i<100; i++)
    {
        skyStars.push(new Star(rand(canvas.width,2),rand(canvas.height,2),rand(1,2),'white'));
    }
     
}
generateSkyStars();

function init()
{
canvas.height = innerHeight - 2;
canvas.width = innerWidth;
generateSkyStars();
}
init();
window.addEventListener('resize',init);

// random number generator
function rand(min,max)
{
    return (Math.random()* (max-min) ) + min;
}
