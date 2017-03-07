const Comment = require('../models/comment');
const Article = require('../models/articles');

exports.list = (req, res) => {
  Article.findOne({ _id: req.params.articleId })
    .populate('comments')
    .exec((err, article) => {
      if (err) res.status(400).send(err);
      res.send(article.comments);
    });
};

exports.create = (req, res) => {
  Article.findOne({ _id: req.params.articleId }, (err, article) => {
    if (err) res.status(400).send(err);

    const comment = new Comment({
      content: req.body.content,
      name: req.body.name
    });
    article.comments.push(comment);

    article.save(err => {
      if (err) res.send(err);
      comment.save(err => {
        if (err) res.send(err);
        res.send('NEW comment: by' + req.body.name);
      });
    });
  });
}

exports.destroy = (req, res) => {
  Article.findOne({ _id: req.params.articleId }, (err, article) => {
    if (err) res.send(err);
    Comment.findOneAndRemove({ _id: req.params.commentId }, (err, comment) => {
      if (err) res.send(err);

      const commentId = comment._id;
      const commentIndex = article.comments.indexOf(commentId);
      article.comments = [
        ...article.comments.slice(0, commentIndex),
        ...article.comments.slice(commentIndex + 1)
      ];

      article.save(err => {
        if (err) res.send(err);
        res.send('REMOVED COMMENT');
      })
    });
  });
}
