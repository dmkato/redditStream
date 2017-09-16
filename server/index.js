const express = require('express');
const redditStream = require('./js/redditStream.js');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/getAllPosts', redditStream.loadAllPosts);

app.post('/getImage', redditStream.getImage);

app.listen(8001, () => {
  console.log('Listening on 8001');
});
