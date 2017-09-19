/* eslint-disable no-console */

const redditData = require('./redditData.js');

let posts = []; // <- DB

const loadAllPosts = (req, res) => {
  if (posts.length > 0) {
    console.log('Sending Cached Posts');
    res.send(posts);
    return Promise.resolve();
  } else {
    return redditData.loadAllPosts()
      .then((curPosts) => {
        posts = curPosts;
        console.log('Sending New Posts');
        res.send(posts);
      })
      .catch(e => console.log(e))
  }
};

const getImage = (req, res) => redditData.getImage(req.body.url)
  .then((image) => {
    console.log(`Sending Image from ${req.body.url}`)
    res.send(image);
  })
  .catch(e => console.log(e));

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
