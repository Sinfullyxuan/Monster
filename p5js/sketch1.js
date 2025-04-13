const sketch = function(p) {
  // Variables
  let fontSize = 0;
  let textX = 0;
  let textY = 0;
  let tPosition = {x: 0, width: 0, height: 0};
  let myImage;
  let lastWindowSize = {width: 0, height: 0};
  let imgYOffset = 0;
  let maxScroll = 0;
  let scrollPosition = 0;
  let paintStrokeHeight = 0;
  let brushBaseY = 0;
  let brushTipPosition = 0;
  let hasScrolled = false;
  let lastScrollY = 0;
  let pauseThreshold = 200;
  let isPaused = false;
  
  // Colors for the multicolored rectangle
  const colors = [
    "#f8a636", "#a8ce3b", "#f37189", "#1ebdc0", "#9e76b5"
  ];
  
  p.preload = function() {
    myImage = p.loadImage('images/paintbrushone.png');
  };
  
  p.setup = function() {
    const container = document.getElementById('sketch1-container');
    if (!container) {
      console.error("Container not found!");
      return;
    }
    
    const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('sketch1-container');
    p.textFont('Montserrat');
    
    calculateLayout();
    maxScroll = Math.max(1000, p.windowHeight);
    window.addEventListener('scroll', handleScroll);
    lastScrollY = window.scrollY;
    const brushStartOffset = 200; 
    brushBaseY = textY + (tPosition.height - tPosition.height * 0.8)/2 + brushStartOffset;
  };
  
  p.draw = function() {
    p.background(255);
    
    if (window.innerWidth !== lastWindowSize.width || 
        window.innerHeight !== lastWindowSize.height) {
      calculateLayout();
    }
    
    drawText();
    drawWhiteBox();
    
    if (hasScrolled) {
      drawPaintStroke();
    }
    
    drawPaintBrush();
  };
  
  function handleScroll() {
    const currentScrollY = window.scrollY;
    const canvasBottom = p.height - pauseThreshold;
    const relativeBrushPosition = brushBaseY + (p.height * 2 * (currentScrollY / maxScroll));
    isPaused = relativeBrushPosition >= canvasBottom && currentScrollY > lastScrollY;
    
    if (currentScrollY !== lastScrollY) {
        hasScrolled = true;
    }
    lastScrollY = currentScrollY;
    
    scrollPosition = p.constrain(currentScrollY / maxScroll, 0, 1);
    
    if (!isPaused) {
        imgYOffset = brushBaseY + (p.height * 2 * scrollPosition);
        brushTipPosition = imgYOffset + (tPosition.height * 0.8 + 150) * 0.9;
        paintStrokeHeight = brushTipPosition - brushBaseY;
    }
}
  
  function calculateLayout() {
    lastWindowSize = { width: window.innerWidth, height: window.innerHeight };
    
    let size = p.width * 0.8;
    p.textSize(size);
    const backupTextSize = p._textSize;
    
    while (p.textWidth("MONSTER") > p.width * 0.97) {
      size--;
      p.textSize(size);
    }
    fontSize = size;
    p.textSize(backupTextSize);
    
    textX = p.width/2;
    textY = 0;
    
    const fullWidth = p.textWidth("MONSTER");
    const beforeT = p.textWidth("MONS");
    tPosition = {
      x: textX - fullWidth/2 + beforeT,
      width: p.textWidth("T"),
      height: p.textAscent()
    };
    
    brushBaseY = textY + (tPosition.height - tPosition.height * 0.8)/2 + 100;
    maxScroll = Math.max(1000, p.windowHeight);
  }
  
  function drawText() {
    p.textSize(fontSize);
    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER, p.TOP);
    p.text("MONSTER", textX, textY);
  }
  
  function drawWhiteBox() {
    p.stroke(255);
    p.strokeWeight(5);
    p.fill(255);
    p.rect(tPosition.x-1, textY, tPosition.width, tPosition.height);
  }
  
  function drawPaintStroke() {
    if (paintStrokeHeight <= 0) return;
    
    const strokeWidth = tPosition.width * 0.6;
    const strokeX = tPosition.x + (tPosition.width - strokeWidth)/2;
    
    // Get the brush tip position (same calculation as in drawPaintBrush)
    const brushTipY = imgYOffset + (tPosition.height * 0.8 + 150) * 0.1;
    
    // Paint stroke should start at the brush tip and extend upward
    const strokeBottom = brushTipY;
    const strokeTop = brushBaseY; // Or adjust this to control maximum height
    
    // Only draw if we have valid dimensions
    if (strokeBottom > strokeTop) {
        p.noStroke();
        
        // Draw multicolored segments
        let segmentWidth = strokeWidth / colors.length;
        for (let i = 0; i < colors.length; i++) {
            p.fill(colors[i]);
            p.rect(
                strokeX + i * segmentWidth, 
                strokeTop-150, // Starts at top
                segmentWidth, 
                strokeBottom - strokeTop // Height grows downward
            );
        }
    }
}
  
  function drawPaintBrush() {
    if (!myImage) return;
    
    const imgWidth = tPosition.width * 0.8;
    const imgHeight = tPosition.height * 0.8;
    const imgX = tPosition.x + (tPosition.width - imgWidth)/2;
    
    // Calculate exact brush tip for positioning
    const brushTipY = imgYOffset + (tPosition.height * 0.8 + 150) * 0.9;
    
    p.push();
    p.translate(imgX + imgWidth/2, brushTipY - (imgHeight + 150) * 0.9);
    p.imageMode(p.CENTER);
    p.image(myImage, 0, 0, imgWidth, imgHeight + 150);
    p.pop();
  }
  
  p.windowResized = function() {
    const container = document.getElementById('sketch1-container');
    if (container) {
      p.resizeCanvas(container.offsetWidth, container.offsetHeight);
      calculateLayout();
    }
  };
};

new p5(sketch);