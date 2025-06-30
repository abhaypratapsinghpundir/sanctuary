const particles = (() => {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let vibe = 'spring';
  let width = window.innerWidth;
  let height = window.innerHeight;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  function setVibe(newVibe) {
    vibe = newVibe;
    initParticles();
  }

  function initParticles() {
    particles = [];
    let count = 150;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
        angle: Math.random() * Math.PI * 2,
        color: getColor()
      });
    }
  }

  function getColor() {
    switch (vibe) {
      case 'rain': return Math.random() < 0.5 ? '#a3cfff' : '#5ebaff';
      case 'ocean': return Math.random() < 0.5 ? '#66d9e8' : '#38b8ca';
      case 'wind': return Math.random() < 0.5 ? '#bde0fe' : '#89c2d9';
      case 'waterfall': return Math.random() < 0.5 ? '#cddafd' : '#dee2ff';
      default: return ['#f1c0e8', '#caffbf', '#ffd6a5'][Math.floor(Math.random()*3)];
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      switch(vibe) {
  case 'rain':
    p.y += 0.8 + Math.random()*0.3; // was 2+
    p.x += 0.2; // was 0.5
    break;
  case 'ocean':
    p.y += Math.sin(p.angle) * 0.2; // was 0.5
    p.x += Math.cos(p.angle) * 0.4; // was 1
    p.angle += 0.005; // slower angle change
    break;
  case 'wind':
    p.x += 0.8 + Math.sin(p.angle); // was 2+
    p.y += Math.cos(p.angle) * 0.2;
    p.angle += 0.01; // slower swirl
    break;
  case 'waterfall':
    p.y += 1.2 + Math.random() * 0.5; // was 4+
    break;
  case 'spring':
    p.x += Math.cos(p.angle) * 0.4;
    p.y += Math.sin(p.angle) * 0.4;
    p.angle += 0.02;
    break;
}


      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    }

    requestAnimationFrame(animate);
  }

  initParticles();
  animate();

  return { setVibe };
})();
