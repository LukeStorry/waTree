# waTree
An arduino-enhanced water bottle, which causes trees on a website to grow, to enhance social interaction of hydration, for COMSM0009 Interactive Devices.


## Components

### /bottle
Arduino code that registers a tilt on the accelerometer and calls the backend API to register that that particular bottle has been drunk from.

### /backend
A RESTful API based on a series of HTTP GET calls, to both register drinks and create a JSON for the output, as well as a series of database-updating and -resetting calls.

### /frontend
A dynamically-scaling forest that uses the supplied JSON to decide on tree size, names and animations.
