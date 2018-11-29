#include <Wire.h>
#include <SPI.h>
#include <Adafruit_LIS3DH.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_NeoPixel.h>

Adafruit_LIS3DH lis = Adafruit_LIS3DH();

#if defined(ARDUINO_ARCH_SAMD)
// for Zero, output on USB Serial console, remove line below if using programming port to program the Zero!
   #define Serial SerialUSB
#endif

const int buttonPin = 12;     // the number of the pushbutton pin
bool buttonStatus = false;

int count = 0;
int timing = 0;

int accelerationY = 0;
int prevAccY = 10;

bool turnPoint = false;
int turnCount = -1;

#define PIN 14
Adafruit_NeoPixel strip = Adafruit_NeoPixel(9, PIN, NEO_GRB + NEO_KHZ800);

void setup(void) {
#ifndef ESP8266
  while (!Serial);     // will pause Zero, Leonardo, etc until serial console opens
#endif

  Serial.begin(9600);
  Serial.println("----");
  Serial.println("LIS3DH test!");
  
  if (! lis.begin(0x18)) {   // change this to 0x19 for alternative i2c address
    Serial.println("Couldnt start");
    while (1);
  }
  Serial.println("LIS3DH found!");
  
  lis.setRange(LIS3DH_RANGE_4_G);   // 2, 4, 8 or 16 G!
  
  Serial.print("Range = "); Serial.print(2 << lis.getRange());  
  Serial.println("G");

  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);

  strip.begin();
  strip.show(); 
}

void check_for_button_press(){
  int buttonState = digitalRead(buttonPin);

  if (buttonState == HIGH) {
    Serial.println("\nButton pressed");
    buttonStatus = !buttonStatus;
    if(buttonStatus){
      Serial.println("You may now drink");
    } else {
      Serial.println("You can no longer drink");
    }
    
    while(digitalRead(buttonPin) == HIGH){
      //Do Nothing
      delay(10);
    }
  }
}

void rainbow(uint8_t wait) {
  uint16_t i, j;

  for(j=0; j<256; j++) {
    for(i=0; i<strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel((i+j) & 255));
    }
    strip.show();
    delay(wait);
  }
}

// Slightly different, this makes the rainbow equally distributed throughout
void rainbowCycle(uint8_t wait) {
  uint16_t i, j;

  for(j=0; j<256*5; j++) { // 5 cycles of all colors on wheel
    for(i=0; i< strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel(((i * 256 / strip.numPixels()) + j) & 255));
    }
    strip.show();
    delay(wait);
  }
}

// Input a value 0 to 255 to get a color value.
// The colours are a transition r - g - b - back to r.
uint32_t Wheel(byte WheelPos) {
  WheelPos = 255 - WheelPos;
  if(WheelPos < 85) {
    return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  }
  if(WheelPos < 170) {
    WheelPos -= 85;
    return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
  WheelPos -= 170;
  return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
}

void check_for_drink(){
  
  if(accelerationY <= 7){
      Serial.println(".");

      if((accelerationY > prevAccY) && (turnPoint == false)){
//        This should be the true minima of the curve
        turnPoint = true;
        turnCount = timing;
      }
      
      timing++;
      prevAccY = accelerationY;
      
  }else if(turnPoint == true){
//    The minimum of the curve should be approximately at the halfway point
    turnPoint = false;
    int approxTurnCount = timing/2;
    
    int upperBound = turnCount + 10;
    int lowerBound = turnCount - 10;
    
    if((approxTurnCount < upperBound) && (approxTurnCount > lowerBound)){
      Serial.println("--------------------------------------------------");
      Serial.println("Person has had water");
      Serial.print("--------------------------------------------------");
    }
    
    timing = 0;
  }
}

// Fill the dots one after the other with a color
void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i=0; i<strip.numPixels(); i++) {
    strip.setPixelColor(i, c);
    strip.show();
    delay(wait);
  }
}


void loop() {
//  for(uint16_t i=0; i<strip.numPixels(); i++) {
//    strip.setPixelColor(i, 100, 100, 100);
//  }
  
//  colorWipe(strip.Color(255, 0, 0), 50); // Red
//  colorWipe(strip.Color(0, 255, 0), 50); // Green
//  colorWipe(strip.Color(0, 0, 255), 50); // Blue

   rainbow(20);
  rainbowCycle(20);
  
  sensors_event_t event; 
  lis.getEvent(&event);
  
  check_for_button_press();
  
// This loop averages over 5 counts
  if(count <= 5){
    accelerationY += event.acceleration.y;
    count++;
    
  } else{
    accelerationY = accelerationY/5;
    
    if(buttonStatus){
      check_for_drink();
    }
    
    count = 0;
    accelerationY = 0;
  }

  
 
  delay(20); 
}
