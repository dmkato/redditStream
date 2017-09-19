import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import { Card, CardBlock, CardTitle, CardSubtitle } from 'reactstrap';

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
}

class RedditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localImageUrl: null,
    };
  }

  getImage (externalImageUrl) {
    const opts = {
      method: 'POST',
      body: JSON.stringify({
        url: externalImageUrl,
      }),
      headers: {
        'Content-Type': "application/json"
      }
    };

    fetch('/getImage', opts)
      .then(res => res.blob())
      .then((blob) => {
        const localImageUrl = URL.createObjectURL(blob);
        this.setState({ localImageUrl });
      })
      .catch(e => console.log(e));
  }


  componentDidMount() {
    const post = this.props.post;
    const externalImageUrl = post.images ? post.thumbnail.split('&amp;').join('&') : null;

    if (externalImageUrl && externalImageUrl !== 'self'){
      this.getImage(externalImageUrl);
    }
  }

  render() {
    const post = this.props.post;
    const postDateSec = post.created_utc;
    const postDateHrs = Math.floor(postDateSec / 3600);
    const curHrs = Math.floor(Date.now() / 3600000);
    const elapsedHours = curHrs - postDateHrs;

    return (
      <Card className="postCard" key={post.id}>
        {this.state.localImageUrl ? <img src={this.state.localImageUrl} alt='Img' width='100'/> : null}
        <CardBlock className="cardBlock">
          <CardSubtitle className="subreddit">
                  r/{post.subreddit} | {elapsedHours} hrs ago
          </CardSubtitle>
          <CardTitle className="redditPostTitle">
            <a href={post.url} target="_blank">{post.title}</a>
          </CardTitle>
        </CardBlock>
      </Card>
    );
  }
}

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: [] };
  }

  componentDidMount() {
    fetch('/getAllPosts')
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    const posts = this.state.posts.map(post => <RedditPost post={post} key={post.id} />);
    return (
      <div className="postList">
        {posts}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <PostList />
      </div>
    );
  }
}

export default App;
