const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../models/user');
const Post = require('../models/post');

describe('Associations', () => {
  let jon, post;

  beforeEach(done => {
    jon = new User({ email: 'jonsnow@gmail.com' });
    post = new Post({
      title: 'And now his watch has ended',
      content: 'I am now kami-sama'
    });

    jon.posts.push(post);

    Promise.all([jon.save(), post.save()])
      .then(() => done());
  });

  it('Saves a relation between a blogpost and a user', done => {
    User.findOne({ email: 'jonsnow@gmail.com' })
      .populate('Posts')
      .then(user => {
        Post.findOne({ _id: user.posts[0] })
          .then(post => {
            assert(post.title === 'And now his watch has ended');
            done();
          });
      })
  });
});
