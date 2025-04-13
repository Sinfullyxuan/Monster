let sketch3 = (p) => {
  let colors = [];
  let brush = { x: 0, y: 0, px: 0, py: 0 };
  let seed;

  // Text
  const line1 = 'Turn sweet moments';
  const line2 = 'into lasting art.';
  const fontSize = 24;
  const textPadding = 16;

  p.setup = () => {
    let container = document.getElementById("sketch3-container");
    let canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent("sketch3-container");
  
    p.noStroke();
    seed = p.random(1000);
  
    // Define grayscale colors
    colors = [
      p.color(40),
      p.color(100),
      p.color(160),
      p.color(200),
      p.color(255),
      p.color(0),
    ];
  
    const baseIndex = p.floor(p.random(colors.length));
    p.background(0); // Start with black
    colors.splice(baseIndex, 1); // Remove background color from splatter
  };

  p.draw = () => {
    // Brush follows mouse smoothly
    brush.x += (p.mouseX - brush.x) / 12;
    brush.y += (p.mouseY - brush.y) / 12;

    if (p.frameCount > 40) drizzle();

    brush.px = brush.x;
    brush.py = brush.y;

    drawText();
  };

  function drawText() {
    const x = p.width - 30;
    const y = p.height / 2;

    p.textAlign(p.RIGHT, p.CENTER);
    p.textSize(fontSize);
    p.textFont('Fira Mono');

    // Border pass
    p.stroke(0);
    p.strokeWeight(2);
    p.fill(255);
    p.text(line1, x, y - textPadding);
    p.text(line2, x, y + textPadding);

    // Fill pass (no stroke)
    p.noStroke();
    p.fill(255);
    p.text(line1, x, y - textPadding);
    p.text(line2, x, y + textPadding);
  }

  p.mouseMoved = () => {
    if (p.frameCount % 7 === 0) {
      const x1 = p.mouseX;
      const y1 = p.mouseY;
      const x2 = p.width - p.mouseX;
      const y2 = p.height - p.mouseY;

      stipple(x1, y1);
      if (x1 !== x2 || y1 !== y2) {
        stipple(x2, y2);
      }
    }
  };

  function drizzle() {
    const speedFactor = 1 + 30 / p.dist(brush.px, brush.py, brush.x, brush.y);
    const strokeW = p.constrain(speedFactor, 1, 20);

    p.strokeWeight(strokeW);
    p.stroke(255);
    p.line(brush.px, brush.py, brush.x, brush.y);
    p.line(p.width - brush.px, p.height - brush.py, p.width - brush.x, p.height - brush.y);
  }

  function splatter(baseX, baseY) {
    const colorChoice = colors[0];
    const offsetX = baseX + p.random(-15, 15);
    const offsetY = baseY + p.random(-15, 15);
    const motionX = 10 * p.movedX;
    const motionY = 10 * p.movedY;

    for (let i = 0; i < 80; i++) {
      const x = offsetX + motionX * (0.5 - p.noise(seed + i));
      const y = offsetY + motionY * (0.5 - p.noise(seed + 2 * i));
      let size = 150 / p.dist(baseX, baseY, x, y);
      size = p.constrain(size, 0, 20);
      const alpha = 255 - size * 5;

      p.noStroke();
      colorChoice.setAlpha(alpha);
      p.fill(colorChoice);
      p.ellipse(x, y, size);
      seed += 0.01;
    }
  }

  function stipple(x, y) {
    p.noStroke();
    p.fill(255);
    for (let i = 0; i < 2; i++) {
      const r = p.random(1, 6);
      p.ellipse(x + p.random(-30, 30), y + p.random(-30, 30), r);
    }
  }

  p.keyPressed = () => {
    if (p.keyCode === 32) {
      p.background(180); // Light reset
    }
  };

  p.mousePressed = () => {
    p.background(0); // Reset to black
  };

  p.windowResized = () => {
    let container = document.getElementById("sketch3-container");
    p.resizeCanvas(container.offsetWidth, container.offsetHeight);
  };
  
};

new p5(sketch3);

