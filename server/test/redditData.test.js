const testResponse = require('./data/testResponse.json');
const testPosts = require('./data/testPosts.json');
const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const createTestContext = (() => {
  const rp = sinon.mock();
  const redditData = proxyquire('../js/redditData.js', {
    'request-promise': rp,
  });

  return {
    rp,
    redditData,
  };
});

describe('redditData', () => {
  it('Should load all posts', (done) => {
    const { rp, redditData } = createTestContext();
    rp.returns(Promise.resolve(testResponse));

    redditData.loadAllPosts()
      .then((posts) => {
        assert.deepEqual(
          posts, testPosts,
          'should isolate data object in each post',
        );
        done();
      })
      .catch(e => console.log(e));
  });

  it('Should load image from url', (done) => {
    const { rp, redditData } = createTestContext();
    const expectedRes = 'image';
    rp.returns(Promise.resolve({ body: expectedRes }));

    redditData.getImage('FakeUrl')
      .then((image) => {
        assert.equal(
          image, expectedRes,
          'should relay body of get request to url',
        );
        done();
      })
      .catch(e => console.log(e));
  });
});
