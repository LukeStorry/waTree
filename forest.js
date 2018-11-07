var forest, tree;
var starting_health, health1, health2, health3;

function setup() {
  createCanvas(displayWidth, displayHeight);
  forest = loadImage("assets/forest.png");
  tree = loadImage("assets/tree.png");

  starting_health = displayHeight*0.7;
  health1 = starting_health;
  health2 = starting_health;
  health3 = starting_health;
  console.log("setup finished");
}

function draw() {
  clear();

  tint(230, 255, 240, 150);
  image(forest, 0, 0, width, height)

  tint(200, 50, 50, calculate_transparency(health1));
  image(tree, width/4 - health1 / 4, height - health1, health1 / 3, health1);

  tint(0, 200, 0, calculate_transparency(health2));
  image(tree, width/2 - health2 / 4, height - health2, health2 / 3, health2);

  tint(0, 0, 200, calculate_transparency(health3));
  image(tree, 3*width/4 - health3 / 4, height - health3, health3 / 3, health3);
}

function mousePressed() {
  if (mouseX < width/3) {
    health1 = update(health1);
  } else if (mouseX < 2*width/3) {
    health2 = update(health2);
  } else {
    health3 = update(health3);
  }
}

function calculate_transparency(health) {
  return 150 * health / starting_health +50
}

function update(health) {
  if (mouseY < height / 2 && health < starting_health * 1.5) {
    return health + 20;
  } else if (health > starting_health * 0.7 ) {
    return health - 20;
  } else {
    return health;
  }
}
