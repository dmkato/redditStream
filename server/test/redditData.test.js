
const testData = require('./testData.json');
const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('redditData', () => {
  let rp
  let redditData

  beforeEach(function() {
    rp = sinon.mock();
    redditData = proxyquire('../js/redditData.js', {
      'request-promise': rp,
    });
  });

  it('Should load all posts', (done) => {
    rp.returns(Promise.resolve(testData.response));

    redditData.loadAllPosts()
      .then((posts) => {
        assert.deepEqual(posts, testData.posts,
          'should isolate data object in each post');
        done();
      });
  });

  it('Should load image from url', (done) => {
    const expectedRes = 'image'
    rp.returns(Promise.resolve({body: expectedRes}));

    redditData.getImage('FakeUrl')
      .then((image) => {
        assert.equal(image, expectedRes,
          'should relay body of get request to url');
        done();
      });
  })
});
