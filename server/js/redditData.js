/* eslint-disable no-console */

const rp = require('request-promise');

const redditUrl = 'https://www.reddit.com/.json?feed=8200b08ae148ed3c8a7f905cb6910e439fedc639&user=Dmkato';
const options = {
  url: redditUrl,
  json: true,
};

const loadAllPosts = () => {
  console.log('Loading Reddit Initial Posts');
  return rp(options)
    .then(res => res.data.children)
    .then(posts => posts.map(post => post.data))
    .then(posts => posts.map(post => ({
      subreddit: post.subreddit,
      id: post.id,
      title: post.title,
      images: post.preview ? post.preview.images[0].resolutions : null,
      thumbnail: post.thumbnail,
      created_utc: post.created_utc,
      url: post.url,
      author: post.author,
    })));
};

const getImage = (url) => {
  console.log(`Getting Image from ${url}`);
  return rp(url)
    .then(res => res.body);
};

module.exports = {
  loadAllPosts,
  getImage,
};
