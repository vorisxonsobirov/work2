const input = document.querySelector("#input");
const avatar = document.querySelector("#avatar");

function Avatar(){
    const url = `https://avatars.dicebear.com/api/avataaars/${input.value}.svg`;
    avatar.src = url;
}
input.addEventListener("keyup", Avatar)




const asosiy = document.getElementById("main");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let spots = [];
let hue = 0;
const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener( "click", (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 3; i++){
        spots.push(new Particle1())
    }
});

canvas.addEventListener( "mousemove", (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 3; i++){
        spots.push(new Particle2())
    }
});

class Particle1{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2 + 40; 
        this.speedX = Math.random() * 2 - 1; 
        this.speedY = Math.random() * 2 - 1; 
        this.color = 'hsl(' + hue + ', 100%, 50%)'; 
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.1) this.size -= 0.03;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
class Particle2{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2 + 3; 
        this.speedX = Math.random() * 2 - 1; 
        this.speedY = Math.random() * 2 - 1; 
        this.color = 'hsl(' + hue + ', 100%, 50%)'; 
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.1) this.size -= 0.03;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
function handleParticle(){
    for(let i = 0; i < spots.length; i++){
        spots[i].update();
        spots[i].draw();
        for(let j = i; j < spots.length; j++){
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 90){
               ctx.beginPath();
               ctx.strokeStyle = spots[i].color;
               ctx.lineWidth = spots[i].size / 10;
               ctx.moveTo(spots[i].x, spots[i].y);
               ctx.lineTo(spots[i].x, spots[i].y);
               ctx.stroke();
            }
        }
        if(spots[i].size <= 0.3){
            spots.splice(i, 1); i--;
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue++;
    requestAnimationFrame(animate);
}

window.addEventListener("resize", ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    Infinity();
});

window.addEventListener("mousemove", ()=>{
    mouse.x = undefined;
    mouse.y = undefined;
});
animate();

window.addEventListener("click", ()=>{
    asosiy.classList.add('active');
    asosiy.style.transform = scale(2);
});