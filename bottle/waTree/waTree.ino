#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_LIS3DH.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_NeoPixel.h>


HTTPClient http;
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

// Fill the dots one after the other with a color
void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i=0; i<strip.numPixels(); i++) {
    strip.setPixelColor(i, c);
    strip.show();
    delay(wait);
  }
}

void flash(uint32_t c, uint8_t wait){
  for(int j=0; j<3; j++){
    for(uint16_t i=0; i<strip.numPixels(); i++) {
      strip.setPixelColor(i, c);
    }
    strip.show();
    delay(wait);
    for(uint16_t i=0; i<strip.numPixels(); i++) {
      strip.setPixelColor(i, strip.Color(0, 0, 0));
    }
    strip.show();
    delay(wait);
  }
  colorWipe(strip.Color(0, 0, 0), 50); // Clear
}

void setup(void) {

  //  Serial.begin(115200);                 //Serial connection
    WiFi.begin("sunnyPC", "54nU0sCh");   //WiFi connection
   
    while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
   
      delay(500);
      Serial.println("Waiting for connection");
    }
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
  
  strip.setBrightness(64);

  strip.begin();
  strip.show(); 
  colorWipe(strip.Color(0, 0, 0), 50); // Clear
}

void check_for_button_press(){
  int buttonState = digitalRead(buttonPin);

  if (buttonState == HIGH) {
    Serial.println("\nButton pressed");
    buttonStatus = !buttonStatus;
    if(buttonStatus){
      colorWipe(strip.Color(0, 0, 255), 50); // Blue
      Serial.println("You may now drink");
    } else {
      colorWipe(strip.Color(255, 0, 0), 50); // Red
      Serial.println("You can no longer drink");
    }
    
    while(digitalRead(buttonPin) == HIGH){
      //Do Nothing
      delay(10);
    }
    delay(500);
    colorWipe(strip.Color(0, 0, 0), 50); // Clear
  }
}

void upon_drink(){
  
  flash(strip.Color(0, 255, 0), 200);
  
  Serial.println("--------------------------------------------------");
  Serial.println("Person has had water");
  Serial.print("--------------------------------------------------");
  
  if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
   
     HTTPClient http;    //Declare object of class HTTPClient
   
     http.begin("http://watree-backend.herokuapp.com/has-drunk/0");  //Specify request destination
     http.addHeader("Content-Type", "text/plain");  //Specify content-type header

     int httpCode = http.GET();
     String payload = http.getString();
     
     Serial.println(payload);
     Serial.println(httpCode);   //Print HTTP return code
   
     http.end();  //Close connection
   
   }else{
   
      Serial.println("Error in WiFi connection");   
   
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
      upon_drink();
    }
    
    timing = 0;
  }
}

void loop() {
  
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
 
}
