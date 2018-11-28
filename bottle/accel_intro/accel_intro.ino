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

#define PIN 13
Adafruit_NeoPixel strip = Adafruit_NeoPixel(60, PIN, NEO_GRB + NEO_KHZ800);

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

static void chase(uint32_t c) {
  for(uint16_t i=0; i<strip.numPixels()+4; i++) {
      strip.setPixelColor(i  , c); // Draw new pixel
      strip.setPixelColor(i-4, 0); // Erase pixel a few steps back
      strip.show();
      delay(25);
  }
}

void loop() {
  for(uint16_t i=0; i<strip.numPixels(); i++) {
    strip.setPixelColor(i, 100, 100, 100);
  }
  
//  chase(strip.Color(255, 0, 0)); // Red
//  chase(strip.Color(0, 255, 0)); // Green
//  chase(strip.Color(0, 0, 255)); // Blue
  
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
