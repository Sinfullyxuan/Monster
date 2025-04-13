(function() {
    const sketch = function(p) {
        let myImage;
        
        p.preload = function() {
            myImage = p.loadImage('images/curve1.png');
        };
        
        p.setup = function() {
            // Use windowHeight (not innerHeight) for consistency
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight * 1.2);
            canvas.parent('sketch2-container');
            
            // Critical for hover to work
            canvas.style('pointer-events', 'none');
            canvas.style('z-index', '1'); // Behind HTML elements
            
            p.noLoop();
        };
      
      p.draw = function() {
          p.background(255);
          p.stroke(0);
          p.strokeWeight(5);

          // Draw the horizontal line
        //   p.line(40, 160, p.width - 40, 160);

          // Style and draw the text
        //   p.fill(0);
        //   p.textSize(24);
        //   p.textAlign(p.LEFT, p.BOTTOM);
        //   p.textFont("Fira Mono");
        //   p.strokeWeight(1);
        //   p.text("will you eat or paint?", 55, 70);

          // Draw the image
          if (myImage) {
            const imgX = 0;
            const imgY = 15;
            const imgW = p.width;
            const imgH = myImage.height * (p.width / myImage.width);
          
            p.imageMode(p.CORNER);
            p.image(myImage, imgX, imgY, imgW, imgH);
          
            // Calculate where to draw the line (e.g., around the bottom of the paint bucket)
            const lineY = imgY + imgH * 0.22; // Adjust this multiplier as needed
          
            p.stroke(0);
            p.strokeWeight(5);
            p.line(40, lineY+30, p.width - 40, lineY+30);
          
            // Black fill below
            const rectY = imgY + imgH;
            p.noStroke();
            p.fill(0);
            p.rect(0, rectY - 10, p.width, p.height);
          }

          // Draw the curved shape below the line
        //   p.noStroke();
        //   p.fill(0);

        //   p.beginShape();
        //   p.vertex(0, 180);
        //   p.curveVertex(0, 180);
        //   p.curveVertex(p.width * 0.3, 300);
        //   p.curveVertex(p.width * 0.6, 210);
        //   p.curveVertex(p.width, 280);
        //   p.vertex(p.width, p.height);
        //   p.vertex(0, p.height);
        //   p.endShape(p.CLOSE);
      };
      
      p.windowResized = function() {
          const canvasHeight = window.innerHeight * 1.5;
          p.resizeCanvas(p.windowWidth, window.innerHeight * 1.2);
      };
  };
  
  new p5(sketch);
})();

