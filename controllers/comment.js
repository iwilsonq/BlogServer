const Comment = require('../models/comment');
const Article = require('../models/articles');

exports.list = (req, res) => {
  res.send('list');
};

exports.create = (req, res) => {
  Article.findOne({ _id: req.params.articleId }, (err, article) => {
    if (err) res.status(400).send(err);

    const comment = new Comment({
      content: req.body.content,
      // user: req.user._id
    });

    comment.save(err => {
      if (err) res.send(err);

      res.send('NEW comment: ' + req.body.content);
    })
  });
}
