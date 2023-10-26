# Athena Forum Site Backend

### Getting Started

Life will be much easier if you open this in a separate editor and open the dedicated terminal for it

`cd website-backend`

`npm install`

`npm start`

The server should be running on localhost:8080
This is the also the dev url for the React frontend requests

### For Testing

Start by starting the server

`npm start`

Then test the endpoints

`npm t`

### Endpoints Currently Used

Root endpoint that starts all endpoints

`/api/v1`

example: `http://localhost:8080/api/v1/articles`

## Article Endpoints

`GET /articles`

- Gets all articles

`POST /articles`

- Adds an article
- Body required

`GET /article/:id`

- Gets one article based on Id
- Parameter required

`PUT /article/:id`

- Updates one article based on Id
- Parameter required
- Body required

`POST /comments`

- Adds a new comment
- Body required

`GET /comments/:id`

- Gets one comment based on article id
- Parameter required (article id)

`PUT /comments/:id/:commentId`

- Updates one comment based on article
- Two parameters required

`POST /issues/`

- Adds an issue

## Opportunities for future development

- [x] Move chat requests from frontend to backend
- [x] Utilize extra endpoints for further frontend development
- [x] Test additional cases
- [x] Build security for personal identification such as email and names
