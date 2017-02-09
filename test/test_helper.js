const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect('mongodb://localhost/journies_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', error => console.warn('Warning', error))
});

beforeEach(done => {
  const { users, articles } = mongoose.connection.collections;
  users.drop(() => {
    articles.drop(() => {
      done();
    });
  });
});
