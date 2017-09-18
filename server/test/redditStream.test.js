
const testPosts = require('./data/testPosts.json');
const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const createTestContext = () => {
  const req = {
    body: {
      url: 'testUrl.com',
    },
  };
  const res = {
    send: sinon.stub(),
  };
  const redditDataMock = {
    loadAllPosts: sinon.stub(),
    getImage: sinon.stub(),
  };
  const redditStream = proxyquire('../js/redditStream.js', {
    './redditData.js': redditDataMock,
  });

  return {
    req,
    res,
    redditDataMock,
    redditStream,
  };
};

describe('redditStream', () => {
  it('Should send all posts from request', (done) => {
    const { req, res, redditDataMock, redditStream } = createTestContext();
    redditDataMock.loadAllPosts.returns(Promise.resolve(testPosts));

    redditStream.loadAllPosts(req, res)
      .then(() => {
        assert.equal(testPosts, res.send.args[0][0], 'should be equal');
        done();
      })
      .catch(e => console.log(e))
  });

  it('Should send all posts from memory', (done) => {
    const { req, res, redditDataMock, redditStream } = createTestContext();
    redditDataMock.loadAllPosts.returns(Promise.resolve(testPosts));

    redditStream.loadAllPosts(req, res)
      .then(() => {
        assert(redditDataMock.loadAllPosts.called, 'loadAllPosts should have been called');
        redditStream.loadAllPosts(req, res)
          .then(() => {
            assert.equal(testPosts, res.send.args[1][0], 'should be equal');
            done();
          })
      })
      .catch(e => console.log(e))
  });

  it('Should send image from url', (done) => {
    const { req, res, redditDataMock, redditStream } = createTestContext();
    const expectedRes = 'image'
    redditDataMock.getImage.returns(Promise.resolve(expectedRes));

    redditStream.getImage(req, res)
      .then(() => {
        assert.equal(expectedRes, res.send.args[0][0],
          'should relay image');
        done();
      })
      .catch(e => console.log(e))
  })
});
