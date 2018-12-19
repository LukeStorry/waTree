![waTree](https://github.com/LukeStorry/waTree/blob/master/frontend/Pics/watree%20logo.png)

An arduino-enhanced water bottle, with a socially-growing forest, to enhance social interaction of hydration, for COMSM0009 Interactive Devices.

---

[Full Demo Video on Youtube](https://youtu.be/FimLVj6nT68)

![Image of full system](https://github.com/LukeStorry/waTree/blob/master/frontend/Pics/study%20space.png)

---

## Components

### Bottle
Arduino code that registers a tilt on the accelerometer and calls the backend API to register that a particular bottle has been drunk from.

![Bottle](https://github.com/LukeStorry/waTree/blob/master/frontend/Pics/bottle.png)


### Backend
An API based on a series of HTTP GET calls, to both register drinks and create a JSON for the output, as well as a series of database-updating and -resetting calls for user info.

![Backend screenshot](https://github.com/LukeStorry/waTree/blob/master/frontend/Pics/watree-backend.png)


### Frontend
A dynamically-scaling forest that uses the backend-supplied JSON to decide on tree size, names and animations.

![screenshot of frontend](https://github.com/LukeStorry/waTree/blob/master/frontend/Pics/watree-frontend.png)
