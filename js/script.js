const ambientAudio = new Audio(`assests/sounds/ambient.mp3`);
ambientAudio.loop= true;
ambientAudio.volume=0.5;
 

let ambientStarted = false;
function startAmbient(){
    if(!ambientStarted){
        ambientAudio.play().catch(()=>{

        });
        ambientStarted=true;
    }
}

const colorBtns = document.querySelectorAll('.colorBtn');
const startBtn = document.getElementById('startBtn');
const ball = document.getElementById('ball');
// const soundSelect = document.getElementById('sound');
const soundBtns = document.querySelectorAll('.soundBtn');
const breathingMsg = document.getElementById('breathingMessage')
let chosenColor='';
let selectedSound ='';

colorBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        startAmbient();
        chosenColor = btn.getAttribute('data-color');
        document.body.style.background= `linear-gradient(-45deg, 
      ${lightenDarkenColor(chosenColor, 30)}, 
      ${chosenColor}, 
      ${lightenDarkenColor(chosenColor, -20)}, 
      ${chosenColor})`;
    });
});
soundBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    startAmbient();
    selectedSound = btn.getAttribute('data-sound');
    // maybe highlight selected button
    soundBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    particles.setVibe(selectedSound);
  });
});

startBtn.addEventListener('click',()=>{
    startAmbient();
    if(!chosenColor|| !selectedSound){
        alert("Pick a color and sound first, silly");
        return;
    }
//     switch(selectedSound){
//   case 'rain': 
//     ball.style.background = "radial-gradient(circle, #a3cfff, rgba(255,255,255,0.1))";
//     break;
//   case 'ocean': 
//     ball.style.background = "radial-gradient(circle, #66d9e8, rgba(255,255,255,0.1))";
//     break;
//   case 'wind':
//     ball.style.background = "radial-gradient(circle, #bde0fe, rgba(255,255,255,0.1))";
//     break;
//   case 'waterfall':
//     ball.style.background = "radial-gradient(circle, #cddafd, rgba(255,255,255,0.1))";
//     break;
//   case 'spring':
//     ball.style.background = "radial-gradient(circle, #f1c0e8, rgba(255,255,255,0.1))";
//     break;
// }

    const audio = new Audio(`assests/sounds/${selectedSound}.mp3`);
    audio.loop = true;
    audio.play();



    document.getElementById('setupArea').style.display='none';
    breathingMsg.style.display='block';

     breathe();

});
function breathe() {
  let inhale = true;
  setInterval(() => {
    if (inhale) {
      ball.classList.add('breathe');
      ball.style.transform = "translate(-50%, -50%) scale(1)";
      ball.style.boxShadow = "0 0 30px rgba(255,255,255,0.6)";
    } else {
      ball.classList.remove('breathe');
      ball.style.transform = "translate(-50%, -50%) scale(3)";
      ball.style.boxShadow = "0 0 10px rgba(255,255,255,0.2)";
    }
    inhale = !inhale;
  }, 4000);
}
function lightenDarkenColor(col, amt) {
  let usePound = false;
  if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
  }

  let num = parseInt(col,16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255; else if (r < 0) r = 0;

  let g = ((num >> 8) & 0x00FF) + amt;
  if (g > 255) g = 255; else if (g < 0) g = 0;

  let b = (num & 0x0000FF) + amt;
  if (b > 255) b = 255; else if (b < 0) b = 0;

  return (usePound?"#":"") + ( (r<<16) | (g<<8) | b ).toString(16).padStart(6,'0');
}
document.body.addEventListener('click', startAmbient);
