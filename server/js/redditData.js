/* eslint-disable no-console */

const rp = require('request-promise');

const redditUrl = 'https://www.reddit.com/.json?feed=8200b08ae148ed3c8a7f905cb6910e439fedc639&user=Dmkato';
const options = {
  url: redditUrl,
  json: true,
};

const loadAllPosts = () => {
  console.log('Loading Initial Reddit Posts');
  return rp(options)
    .then(res => res.data.children.map(post => ({
      subreddit: post.data.subreddit,
      id: post.data.id,
      title: post.data.title,
      images: post.data.preview ? post.data.preview.images[0].resolutions : null,
      thumbnail: post.data.thumbnail,
      created_utc: post.data.created_utc,
      url: post.data.url,
      author: post.data.author
    })))
};

const getImage = (url) => {
  console.log(`Getting Image from ${url}`);
  return rp({
    url,
    encoding: null,
    method: 'GET'
  })
};

module.exports = {
  loadAllPosts,
  getImage
};
