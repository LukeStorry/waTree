var forest, tree, pine_tree, pine_forest, seuss_tree, seuss_forest;
var starting_health, health1, health2, health3, health_delta;
var color1, color2, color3

function setup() {
  createCanvas(displayWidth, displayHeight);
  tree = pine_tree = loadImage("assets/pine_tree.png");
  forest = pine_forest = loadImage("assets/pine_forest.png");
  seuss_tree = loadImage("assets/seuss_tree.png");
  seuss_forest = loadImage("assets/seuss_forest.png");


  starting_health = height * 0.8;
  health1 = starting_health;
  health2 = starting_health;
  health3 = starting_health;
  color1 = color(255, 20, 120);
  color2 = color(120, 255, 10);
  color3 = color(20, 120, 255);

}

function draw() {
  clear();


  tint(230, 255, 240, 120);
  image(forest, 0, 0, width, height);

  tint(color1, calculate_transparency(health1));
  image(tree, width / 4 - health1 / 5, height - health1, health1 / 3, health1);

  tint(color2, calculate_transparency(health2));
  image(tree, width / 2 - health2 / 5, height - health2, health2 / 3, health2);

  tint(color3, calculate_transparency(health3));
  image(tree, 3 * width / 4 - health3 / 5, height - health3, health3 / 3, health3);

  health1 -= height / 10000;
  health2 -= height / 10000;
  health3 -= height / 10000;
}

function mousePressed() {
  if (mouseX < width / 3) {
    health1 = update(health1);
  } else if (mouseX < 2 * width / 3) {
    health2 = update(health2);
  } else {
    health3 = update(health3);
  }
}

function keyPressed() {
  if (tree == pine_tree) {
    tree = seuss_tree;
    forest = seuss_forest;
  } else {

    tree = pine_tree;
    forest = pine_forest;
  }
}

function calculate_transparency(health) {
  return 150 * health / starting_health + 50;
}

function update(health) {
  if (mouseY < height / 2 && health < height) {
    return health + starting_health / 15;
  } else if (health > height / 3) {
    return health - starting_health / 15;
  } else {
    return health;
  }
}
