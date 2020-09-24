
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
//resizing the canvas


let x=0,y=0,inc=true;

function init()
{
canvas.height = innerHeight ;
canvas.width = innerWidth ;
}
init();
addEventListener('resize',init);
for(let j=0;j<10;j++)
{
for(let i=0;i<9;i++)
{
c.fillRect(x,y,82,82);
c.fill();
x+=164; 
}
if(inc)
{
    x=82;
    inc=!(inc);
}
else{
    x=0;
    inc=!(inc);
}
y+=82;
}

