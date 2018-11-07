PImage forest, tree;
int starting_health, health1, health2, health3;

void setup() {
  size(1000, 800);
  // import images
  forest = loadImage("forest.png");
  tree = loadImage("tree.png");

  // make health variables for each tree
  starting_health = 600;
  health1 = starting_health;
  health2 = starting_health;
  health3 = starting_health;
}

void draw() {
  tint(0, 0, 0);
  image(forest, 0, 0, width, height);

  tint(200, 0, 0, 200*health1/starting_health); // make tree red
  image(tree, 350-health1/2, height-health1, health1/2, health1);

  tint(0, 200, 0, 200*health2/starting_health); // make tree green
  image(tree, 500-health2/4, height-health2, health2/2, health2);

  tint(0, 0, 200, 200*health3/starting_health); // make tree blue
  image(tree, 800-health3/4, height-health3, health3/2, health3);

  if (mousePressed) {
    if (mouseX < 400) {
      health1 = update(health1);
    } else if (mouseX < 700) {
      health2 = update(health2);
    } else {
      health3 = update(health3);
    }
  }
}

int update(int health) {
  if (mouseY < height/2 && health < starting_health + 200) {
    return health + 20;
  } else if (health > starting_health - 250) {
    return health - 20;
  } else {
    return health;
  }
}
