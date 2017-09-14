/* eslint-disable no-console */


const rp = require('request-promise');

const redditUrl = 'https://www.reddit.com/.json?feed=8200b08ae148ed3c8a7f905cb6910e439fedc639&user=Dmkato';
const options = {
   url: redditUrl,
   json: true
}

rp(redditUrl)
  .then((res) => {
    return res.data
  })
  .then((reddit) => {
     
 })

// Grab first 10 posts

// Store most recent id

// Store last id

// Loop Forever

// Send get request to redditUrl

// Grab posts untill id = mostRecentId

// Store new most recent id

// Display contents
