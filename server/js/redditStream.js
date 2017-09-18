/* eslint-disable no-console */

const redditData = require('./redditData.js');

let posts = []; // <- DB

const loadAllPosts = (req, res) => {
  if (posts.length > 0) {
    console.log('Posts Already Loaded');
    res.send(posts);
    return Promise.resolve();
  }
  return redditData.loadAllPosts()
    .then((curPosts) => {
      posts = curPosts;
      console.log('Loaded Posts');
      res.send(posts);
    });
};

const getImage = (req, res) => {
  return redditData.getImage(req.body.url)
    .then((image) => {
      res.send(image);
    });
};

// const updatePostList = () => {
//
// };

// Grab first 10 posts

// Store most recent id

// Store last id

// Loop Forever

// Send get request to redditUrl

// Grab posts untill id = mostRecentId

// Store new most recent id

// Display contents

module.exports = {
  loadAllPosts,
  getImage,
};
