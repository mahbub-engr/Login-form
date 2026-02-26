
const starContainer = document.querySelector('.star-container');
const aura = document.querySelector('.aura');

let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const auraColors = [
  ["255,0,150","0,255,255"], ["0,255,100","0,100,255"],
  ["255,100,0","180,0,255"], ["255,0,0","255,255,0"],
  ["0,255,255","255,0,255"], ["255,200,0","0,200,255"],
  ["180,0,255","255,0,200"], ["0,255,50","255,0,100"],
  ["255,150,0","0,255,150"], ["255,0,255","0,150,255"]
];
let currentAura = 0;

document.addEventListener('click', () => {
  currentAura = (currentAura + 1) % auraColors.length;
  aura.style.background = `radial-gradient(circle,
    rgba(${auraColors[currentAura][0]},0.9),
    rgba(${auraColors[currentAura][1]},0.7),
    transparent 70%)`;
});

/* Create Falling Star */
function createStar() {
  const star = document.createElement('div');

  const isTail = Math.random() > 0.7;
  star.classList.add('star');
  if(isTail) star.classList.add('tail');

  if(!isTail){
    const size = Math.random() * 3 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.animation = `fall linear forwards, twinkle ${Math.random()*2 + 1}s infinite`;
  }

  star.style.top = -200 + "px";
  star.style.left = Math.random() * window.innerWidth + "px";

  const duration = Math.random() * 5 + 4;
  star.style.animationDuration = duration + "s";

  starContainer.appendChild(star);

  // Hover + Repelling
  const interaction = setInterval(()=>{
    const rect = star.getBoundingClientRect();
    const starX = rect.left + rect.width/2;
    const starY = rect.top + rect.height/2;

    const dx = starX - mouseX;
    const dy = starY - mouseY;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < 120){
      const repelStrength = (120 - dist)/15;
      star.style.left = parseFloat(star.style.left || 0) + dx/dist * repelStrength + "px";
      star.style.top = parseFloat(star.style.top || 0) + dy/dist * repelStrength + "px";

      star.style.transform = `scale(${1 + (120 - dist)/200})`;
      star.style.boxShadow = "0 0 20px white, 0 0 40px rgba(255,255,255,0.5)";
    } else {
      star.style.transform = `scale(1)`;
      star.style.boxShadow = "0 0 6px white";
    }
  },30);

  setTimeout(()=>{
    clearInterval(interaction);
    star.remove();
  }, duration*1000);
}

setInterval(createStar, 40);

/* Smooth aura follow */
function animateAura(){
  posX += (mouseX - posX) * 0.08;
  posY += (mouseY - posY) * 0.08;

  aura.style.left = posX + "px";
  aura.style.top = posY + "px";

  requestAnimationFrame(animateAura);
}
animateAura();

