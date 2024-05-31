let INTERVAL = 0;
let boggus;
let bubbleUP = 2; // Define a speed for bubbles to move up
let bubblewiggle;
let bubblesX;
let numBubbles = 10; // Set the number of bubbles
let bubbles = []; // Create an array to store the bubble properties
let MAN = 0;
let Z = 0;
let x = -500;
let xEND = 250;
let frequency = 0.01; // Adjust this value to change the frequency of the sine wave
let amplitude = 20; // Adjust this value to change the amplitude of the sine wave
let startY;
let img;
let showImage = false; // Flag to control image visibility
let alpha = 0; // Alpha value for the image (0 to 255)
let fadingIn = true; // Flag to control fading direction
let fadeSpeed = 1; // Speed of fading

function preload() {
  // Load an image from an online source with CORS support
  img = loadImage('https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/msnbc/Components/Photos/040331/040331_sharktale_bcol_2p.jpg');
}

function setup() {
  createCanvas(700, 700);
  noStroke();
  startY = random(-200, 200);
  boggus = map(noise(INTERVAL), 0, 1, -30, 30);

  // Initialize bubbles with random x positions and starting y position
  for (let i = 0; i < numBubbles; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      wiggle: 0
    });
  }
}

function fished() {
  Z = Z + 0.1;
  let y = sin(Z) * (amplitude * 0.4) + startY;
  fill(0);
  triangle(350 + x, 400 + y, xEND + x, 300 + y, xEND + x, 500 + y);
  ellipse(300 + x, 400 + y, 300, 100);
  triangle(250 + x, 400 + y, 150 + x, 325 + y, 150 + x, 475 + y);
  fill(255);
  ellipse(400 + x, 400 + y, 10, 10);
  ellipse(330 + x, 400 + y, 10, 10);
  x = x + 3;

  if (x > width) {
    x = -500; // Reset the x value to its initial value
    startY = random(-200, 200);
  }
}

function bubblO() {
  fill(174, 221, 252, 128);
  for (let i = 0; i < numBubbles; i++) {
    let bubble = bubbles[i];
    bubblewiggle = boggus;
    bubble.y = bubble.y - bubbleUP;
    if (bubble.y < 0) {
      bubble.y = height;
      bubble.x = random(width);
    }
    ellipse(bubble.x + bubble.wiggle, bubble.y, 30, 30);
  }
}

function draw() {
  // Draw background gradient
  for (let y = 0; y <= height; y++) {
    let c = map(y, 0, height, 20, 200);
    fill(c, c, 230);
    rect(0, y, width, 1);
  }

  // Update alpha value for fade-in and fade-out effect
  if (fadingIn) {
    alpha += fadeSpeed;
    if (alpha >= 255) {
      alpha = 255;
      fadingIn = false; // Start fading out
    }
  } else {
    alpha -= fadeSpeed;
    if (alpha <= 0) {
      alpha = 0;
      fadingIn = true; // Start fading in
    }
  }

  // Draw the image with the current alpha value
  tint(255, alpha); // Apply alpha transparency to the image
  image(img, width / 2 - img.width / 2, height / 2 - img.height / 2);
  noTint(); // Reset tint

  bubblO();
  fished();
  INTERVAL += 0.01;
}
