const Authentication = require('./controllers/authentication');
const Articles = require('./controllers/articles');
const Comment = require('./controllers/comment');
const Subscriber = require('./controllers/subscriber');

const multer  = require('multer');
const upload = multer({
  dest:'./public/uploads/',
  limits: { fileSize: 2000000, files: 1 }
});

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
  app.get('/', function (req, res) {
    res.send({hi: 'there'});
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.get('/articles', Articles.list);
  app.get('/articles/:title', Articles.find);
  app.post('/articles', upload.single('image'), Articles.create);
  app.put('/articles/:id', Articles.edit);
  app.delete('/articles/:id', Articles.destroy);

  app.get('/articles/:articleId/comments', Comment.list);
  app.post('/articles/:articleId/comments', Comment.create);
  app.delete('/articles/:articleId/comments/:commentId', Comment.destroy);
}
