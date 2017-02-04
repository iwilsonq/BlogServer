const assert = require('assert');
const User = require('../models/user');

describe('Deleting a user', () => {
  let jon;
  beforeEach(done => {
    jon = new User({ email: 'jonsnow@gmail.com' });
    jon.save()
      .then(() => done());
  });

  it('model instance remove', done => {
    jon.remove()
      .then(() => User.findOne({ email: 'jonsnow@gmail.com' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', done => {
    User.remove({ email: 'jonsnow@gmail.com' })
      .then(() => User.findOne({ email: 'jonsnow@gmail.com' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
