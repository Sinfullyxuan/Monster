// p5js/sketch3.js
let fireworks = [];
const colorPalette = ["#f8a636", "#a8ce3b", "#f37189", "#1ebdc0", "#9e76b5"];
let gravity;

function setup() {
  // Get container and set canvas size explicitly
  let container = document.getElementById('sketch4-container');
  let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent('sketch4-container');
  canvas.style('display', 'block'); // Ensure canvas is visible
  
  colorMode(RGB);
  gravity = createVector(0, 0.20);
  strokeWeight(4);
  
  // Start with one firework
  fireworks.push(new Firework());
}

function draw() {
  if (frameCount === 1) {
    noStroke();
    fill(0);
    rect(0, 0, width, height); // Solid black base
  }

  background(0,35); // Semi-transparent background for trails
  
  
  // Randomly launch new fireworks
  if (random(1) < 0.05) {
    fireworks.push(new Firework());
  }
  
  // Update and display all fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

function windowResized() {
  let container = document.getElementById('sketch4-container');
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

class Firework {
  constructor() {
    this.color = color(255);
    this.particles = [];
    this.exploded = false;
    this.firework = new Particle(random(width), height, this.color, true);
  }
  
  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      
      if (this.firework.vel.y >= 0) {
        this.explode();
        this.exploded = true;
      }
    }
    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    
    for (let p of this.particles) {
      p.show();
    }
  }
  
  done() {
    return this.exploded && this.particles.length === 0;
  }
  
  explode() {
    for (let i = 0; i < 100; i++) {
      const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.color);
      this.particles.push(p);
    }
  }
}

class Particle {
  constructor(x, y, c, isFirework = false) {
    this.pos = createVector(x, y);
    this.isFirework = isFirework;
    this.color = c;
    
    if (this.isFirework) {
      this.vel = createVector(0, random(-12, -8));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(2, 6));
    }
    
    this.acc = createVector(0, 0);
    this.lifespan = 255;
    this.size = isFirework ? 4 : random(2, 5);
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    if (!this.isFirework) {
      this.vel.mult(0.95);
      this.lifespan -= 3;
    }
  }
  
  show() {
    if (!this.isFirework) {
      noStroke();
      fill(red(this.color), green(this.color), blue(this.color), this.lifespan);
    } else {
      stroke(red(this.color), green(this.color), blue(this.color));
      fill(red(this.color), green(this.color), blue(this.color), 200);
    }
    circle(this.pos.x, this.pos.y, this.size);
  }
  
  done() {
    return this.lifespan <= 0;
  }
}

// Helper function
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}