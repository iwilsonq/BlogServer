const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect('mongodb://localhost/journies');
  mongoose.connection
    .once('open', () => done())
    .on('error', error => console.warn('Warning', error))
});

beforeEach(done => {
  const { users, posts } = mongoose.connection.collections;
  users.drop(() => {
    posts.drop(() => {
      done();
    });
  });
});
