const assert = require('assert');
const User = require('../models/user');

describe('Creating users', () => {
  it('Saves a user', done => {
    const jon = new User({ email: 'jonsnow@gmail.com' });

    jon.save()
      .then(() => {
        assert(!jon.isNew);
        done();
      });
  });
})
