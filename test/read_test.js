const assert = require('assert');
const User = require('../models/user');

describe('Reading users out of database', () => {
  let alex, joe, maria, zach;

  beforeEach(done => {

    alex = new User({ email: 'alex@gmail.com' });
    joe = new User({ email: 'joe@gmail.com' });
    maria = new User({ email: 'maria@gmail.com' });
    zach = new User({ email: 'zach@gmail.com' });

    Promise.all([alex.save(), joe.save(), zach.save(), maria.save()])
      .then(() => done());
  });

  it('finds all users with a name of joe', done => {
    User.find({ email: 'joe@gmail.com' })
      .then(users => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('find a user with a particular id', done => {
    User.findOne({ _id: joe._id })
      .then(user => {
        assert(user.email === 'joe@gmail.com');
        done();
      })
  });

  it('can skip and limit the result set', done => {
    User.find({})
      .sort({ email: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].email === 'joe@gmail.com');
        assert(users[1].email === 'maria@gmail.com');
        done();
      });
  });
});
