#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>

HTTPClient http;

void setup() {
 
//  Serial.begin(115200);                 //Serial connection
//  WiFi.begin("sunnyPC", "54nU0sCh");   //WiFi connection
// 
//  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
// 
//    delay(500);
//    Serial.println("Waiting for connection");
// 
//  }
 
}

void loop() {
 
// if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
// 
//   HTTPClient http;    //Declare object of class HTTPClient
// 
//   http.begin("https://lukestorry.co.uk/has-drunk/potato/500/");  //Specify request destination
//   http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header
// 
//   int httpCode = http.POST("");                 //Send the request
//   String payload = http.getString();                  //Get the response payload
// 
//   Serial.println(httpCode);   //Print HTTP return code
//   Serial.println(payload);    //Print request response payload
// 
//   http.end();  //Close connection
// 
// }else{
// 
//    Serial.println("Error in WiFi connection");   
// 
// }
// 
//  delay(30000);  //Send a request every 30 seconds
 
}
