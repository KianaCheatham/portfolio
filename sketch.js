// let lines = [];
// let numLines = 40;
// let numPoints = 40;
// let cols = ['#8BAE8D', '#C9D8B6', '#6D8A96', '#C9D8B6', '#4F6B5A', '#D7E3E5', '#91A88A', '#CBD8CE', '#8BAE8D', '#6D8A96', '#C9D8B6'];


// function setup() {
//     let canvas = createCanvas(windowWidth, windowHeight);
//     canvas.position(0, 0);
//     canvas.style('z-index', '-1');
//     canvas.style('position', 'fixed');

//     for (let i = 0; i < numLines; i++) {
//         let pts = [];
//         let xPos = (width / (numLines - 1)) * i; // evenly spread across full width
//         for (let j = 0; j < numPoints; j++) {
//             pts.push({
//                 x: xPos,
//                 baseX: xPos,
//                 y: (height / (numPoints - 1)) * j
//             });
//         }
//         let col = cols[i % cols.length]; // cycles through your colors
//         lines.push({ points: pts, col: col });
//     }
// }

// function draw() {
//     clear();

//     for (let line of lines) {
//         beginShape();
//         noFill();
//         stroke(line.col);
//         strokeWeight(3);

//         for (let pt of line.points) {
//             // push away from mouse
//             let d = dist(mouseX, mouseY, pt.x, pt.y);
//             let radius = 180;
//             if (d < radius && mouseIsPressed || d < radius) {
//                 let force = (radius - d) / radius;
//                 let angle = atan2(pt.y - mouseY, pt.x - mouseX);
//                 pt.x += cos(angle) * force * 12;
//             }

//             // spring back to original position
//             pt.x += (pt.baseX - pt.x) * 0.02;

//             vertex(pt.x, pt.y);
//         }
//         endShape();
//     }
// }

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
//     // recalculate base positions on resize
//     let positions = [0.1, 0.3, 0.5, 0.7, 0.9];
//     for (let i = 0; i < lines.length; i++) {
//         for (let pt of lines[i].points) {
//             pt.baseX = width * positions[i];
//         }
//     }
// }















// let particles = [];
// let flowfield;
// let cols, rows;
// let scl = 20;
// let zoff = 2;
// let numParticles = 4000;

// function setup() {
//     let canvas = createCanvas(windowWidth, windowHeight);
//     canvas.position(0, 0);
//     canvas.style('z-index', '-1');
//     canvas.style('position', 'fixed');
    
//     cols = floor(width / scl);
//     rows = floor(height / scl);
//     flowfield = new Array(cols * rows);
    
//     for (let i = 0; i < numParticles; i++) {
//         particles.push(new Particle());
//     }
    
//     background('#F6F7F4');
//     this.alpha = random(8, 20);
// }

// function draw() {
//     // no background clear — lines build up over time!
    
//     // update flow field
//     let yoff = 0;
//     for (let y = 0; y < rows; y++) {
//         let xoff = 0;
//         for (let x = 0; x < cols; x++) {
//             let index = x + y * cols;
//             let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
            
//             // mouse influence — warps the field near cursor
//             let d = dist(mouseX, mouseY, x * scl, y * scl);
//             if (d < 150) {
//                 let mouseAngle = atan2(mouseY - y * scl, mouseX - x * scl);
//                 angle = lerp(angle, mouseAngle, (150 - d) / 150);
//             }
            
//             let v = p5.Vector.fromAngle(angle);
//             v.setMag(1);
//             flowfield[index] = v;
//             xoff += 0.1;
//         }
//         yoff += 0.1;
//     }
//     zoff += 0.0003;
    
//     // update particles
//     for (let p of particles) {
//         p.follow(flowfield);
//         p.update();
//         p.edges();
//         p.show();
//     }
// }

// function mousePressed() {
//     // clear and restart on click
//     background('#F6F7F4');
// }

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
//     cols = floor(width / scl);
//     rows = floor(height / scl);
//     flowfield = new Array(cols * rows);
//     background('#F6F7F4');
// }

// class Particle {
//     constructor() {
//         this.pos = createVector(random(width), random(height));
//         this.vel = createVector(0, 0);
//         this.acc = createVector(0, 0);
//         this.maxSpeed = 2;
//         this.prevPos = this.pos.copy();
//         this.col = random([
//             '#8BAE8D',
//             '#C9D8B6', 
//             '#6D8A96',
//             '#4F6B5A',
//             '#91A88A',
//             '#CBD8CE',
//             '#6C8F9B'
//         ]);
//         this.alpha = random(40, 100);
//     }

//     follow(vectors) {
//         let x = floor(this.pos.x / scl);
//         let y = floor(this.pos.y / scl);
//         let index = x + y * cols;
//         if (vectors[index]) {
//             let force = vectors[index].copy();
//             this.acc.add(force);
//         }
//     }

//     update() {
//         this.vel.add(this.acc);
//         this.vel.limit(this.maxSpeed);
//         this.pos.add(this.vel);
//         this.acc.mult(0);
//     }

//     show() {
//         let c = color(this.col);
//         c.setAlpha(this.alpha);
//         stroke(c);
//         strokeWeight(1);
//         line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
//         this.updatePrev();
//     }

//     updatePrev() {
//         this.prevPos.x = this.pos.x;
//         this.prevPos.y = this.pos.y;
//     }

//     edges() {
//         if (this.pos.x > width) { this.pos.x = 0; this.updatePrev(); }
//         if (this.pos.x < 0) { this.pos.x = width; this.updatePrev(); }
//         if (this.pos.y > height) { this.pos.y = 0; this.updatePrev(); }
//         if (this.pos.y < 0) { this.pos.y = height; this.updatePrev(); }
//     }
// }


let blobs = [];
let numBlobs = 6;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('filter', 'blur(30px)'); 
    noStroke();
    
    for (let i = 0; i < numBlobs; i++) {
        blobs.push(new Blob());
    }
}

function draw() {
    background('#F6F7F4');
    
    drawGradientBg(); // soft static background
    
    for (let b of blobs) {
        b.update();
        b.show();
    }
}

function drawGradientBg() {
    // soft static color zones in background
    let colors = ['#8BAE8D', '#6D8A96', '#C9D8B6', '#CBD8CE'];
    let positions = [{x: 0.2, y: 0.5}, {x: 0.8, y: 0.2}, {x: 0.6, y: 0.8}, {x: 0.4, y: 0.3}];
    
    for (let i = 0; i < colors.length; i++) {
        let c = color(colors[i]);
        c.setAlpha(60);
        fill(c);
        ellipse(width * positions[i].x, height * positions[i].y, width * 0.8);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Blob {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.r = random(100, 220);
        this.noiseOffset = random(1000);
        this.col = random([
            '#91A88A',
            '#3F7A5D',
            '#6D8A96',
            '#4F6B5A',
            '#CBD8CE',
            '#CBD8CE',
        ]);
    }

    update() {
        // organic drift
        this.x += map(noise(this.noiseOffset), 0, 1, -3, 3);
        this.y += map(noise(this.noiseOffset + 100), 0, 1, -3, 3);
        this.noiseOffset += 0.008;

        // strong mouse attraction
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < 400) {
            let angle = atan2(mouseY - this.y, mouseX - this.x);
            let strength = map(d, 0, 400, 6, 3); // stronger when closer
            this.x += cos(angle) * strength;
            this.y += sin(angle) * strength;
        }

        // wrap edges
        if (this.x < -this.r) this.x = width + this.r;
        if (this.x > width + this.r) this.x = -this.r;
        if (this.y < -this.r) this.y = height + this.r;
        if (this.y > height + this.r) this.y = -this.r;

        // repel from other blobs
        for (let other of blobs) {
          if (other === this) continue; // skip self
          let d = dist(this.x, this.y, other.x, other.y);
          let minDist = (this.r + other.r) * 0.6;
          if (d < minDist && d > 0) {
              let angle = atan2(this.y - other.y, this.x - other.x);
              let force = (minDist - d) / minDist;
              this.x += cos(angle) * force * 3;
              this.y += sin(angle) * force * 3;
          }
        }
    }

    show() {
        // outer glow
        for (let i = 4; i > 0; i--) {
            let c = color(this.col);
            c.setAlpha(map(i, 4, 0, 10, 50));
            fill(c);
            noStroke();
            ellipse(this.x, this.y, this.r * i);
        }
        // solid center
        let c = color(this.col);
        c.setAlpha(120);
        fill(c);
        ellipse(this.x, this.y, this.r * 0.6);
    }
}