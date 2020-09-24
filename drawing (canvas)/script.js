const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.style.background = '#fff';
let isDrawing;
let lastX;
let lastY;
let value ;
let lwidth;
const color = document.querySelector('[type="color"]');
const range = document.querySelector('[type="range"]');
const checkbox = document.querySelector('[type="checkbox"]');
if(checkbox.checked) checkbox.click();
//resizing the  canvas
function init(){
canvas.height = innerHeight - 40;
canvas.width = innerWidth - 40;
}
init();

//event listeners
canvas.addEventListener('mousedown',(e)=>{
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});
addEventListener('resize',init);
canvas.addEventListener('mousemove',draw);

canvas.addEventListener('mouseleave',(e)=>{
    isDrawing = false;
});

canvas.addEventListener('mouseup',()=>{
    isDrawing = false;
});

//colorfull line
const colorfulcheckbox = document.querySelector('#colorful');
if(colorfulcheckbox.checked) colorfulcheckbox.click();
let change = 1;
function selectColorful()
{
  if(colorfulcheckbox.checked)
  {
    if(checkbox.checked) checkbox.click();

  }
  
}


//draw function
function draw(e){
  c.save();
  if(!isDrawing) return; // function not executing if user not clicked while mousemoving
  c.beginPath();
  c.moveTo(lastX,lastY);
  c.lineTo(e.offsetX,e.offsetY);
  if(colorfulcheckbox.checked)
{ 

  c.strokeStyle = `hsl(${change},50%,50%)`;
}
else{
  c.strokeStyle = value;

}
  c.lineWidth = lwidth;
  c.lineJoin = 'round';
  c.lineCap = 'round';
  c.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
  change +=4;
c.restore();
}
//additional feature functions

//erasing the content
function erase()
{
  if(checkbox.checked)
  { 
    if(colorfulcheckbox.checked) colorfulcheckbox.click();
    value = '#fff';
  }
  else{
     changeColor()
  }
}

//changing color of the lines
function changeColor(){
     value = color.value;
}
changeColor();
const h4 = document.querySelector('h4');
//changing width of the line
function changeWidth(){
  lwidth = range.value;
  h4.innerText = range.value;
}
changeWidth();
 
//saving the contents of the canvas
const sbutton = document.querySelector('.saveButton');
 
sbutton.addEventListener('click',save);

function save()
{
const url = canvas.toDataURL('image/png');
sbutton.href = url;

}