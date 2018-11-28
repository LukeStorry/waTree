# waTree-backend
A Node.js Express server that takes in POSTs from the bottle's arduino,
persists data an sqlite database,
and responds to the frontend's GET requests with a pre-formatted JSON.


## API
TODO definition

## Usage

## Deployment
### Locally
```bash
node server.js
```
### on Heroku
```bash
heroku deploy
```


## Testing (locally, using curl)

### GET
for example, the following command returns all usernames
```bash
curl localhost:3030/all/"
```

### POST
for example, to say a user potato has drunk with a score 500
```bash
curl -i -x POST localhost:3030/has-drunk/potato/500/"
```
