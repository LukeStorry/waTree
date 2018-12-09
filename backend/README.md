# waTree-backend 
A [Node](https://nodejs.org/en/)-[Express](https://expressjs.com/) server that links a set of water-bottle-arduinos to a forest frontend.

Hosted on [Heroku](http://watree-backend.herokuapp.com/) and using [NoDB](https://github.com/Miserlou/NoDB) to store user info and lists of timestamps of water-drinking.

---

## API
For ease of use and testing during the experimentation, all API methods are HTTP GET.

|Call|Description|
|---  |---  |
|`/`| Returns a JSON list object with format `{Bottle:int, UserName:string, Score:int, isRaining:bool}` for each user.|
|`/has-drunk/<bottleNum>`|Registers that a bottle has been drunk from, thus adding a timestamp to that bottle's associated `drinks` list.|
|`/add/<name>`|Adds a new user to the database, with an empty drinks list and the lowest unused bottle number.|
|`/rename/<bottleNum>/<name>`|Updates the user information associated with a particular bottle.
|`/reset/<name1>,<name2>,<name3>`|Removes all users from the database, and replaces them with a series of blank users with names given as csv.|

