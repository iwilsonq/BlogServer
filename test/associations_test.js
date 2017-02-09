const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../models/user');
const Article = require('../models/articles');

describe('Associations', () => {
  let jon, article;

  beforeEach(done => {
    jon = new User({ email: 'jonsnow@gmail.com' });
    article = new Article({
      title: 'And now his watch has ended',
      content: 'I am now kami-sama'
    });

    jon.articles.push(article);

    Promise.all([jon.save(), article.save()])
      .then(() => done());
  });

  it('Saves a relation between a blogarticle and a user', done => {
    User.findOne({ email: 'jonsnow@gmail.com' })
      .populate('Articles')
      .then(user => {
        Article.findOne({ _id: user.articles[0] })
          .then(article => {
            assert(article.title === 'And now his watch has ended');
            done();
          });
      })
  });
});
