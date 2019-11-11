# NC News

This Northcoders News API was created as part of the backend module for Northcoders Developer Pathway Bootcamp which can be accessed [here](https://ben-rut-nc-news.herokuapp.com/api) via Heroku.

The link above gives a list of all the available endpoints on the API and how to access them.

## Installation

Alternatively, to run the API locally on your computer, first download the repo and install the dependencies:

```bash
npm i
```

```js
“dependencies”: {
    “cors”: “^2.8.5”,
    "express": "^4.17.1",
    "knex": "^0.19.5",
    "pg": "^7.12.1"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "chai-sorted": "^0.2.0",
    "mocha": "^6.2.1",
    "supertest": "^4.0.2"
  }
```

Then set up the database:

```bash
npm run setup-dbs
npm run migrate-latest
npm run seed
```

The API can be viewed in your preferred browser on  
[localhost:9090/api](localhost:9090/api) after running

```bash
npm start
```

## Testing

To view the tests on the available endpoints, run:

```bash
npm t
```

This will display a list of the tests broken down by endpoint, happy paths and sad paths.
