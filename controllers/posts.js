const Post = require('../models/post');

exports.list = function(req, res) {
  Post.find()
    .sort('-created')
    .exec(function(error, posts) {
      if (error) {
        return res.status(400).send({ message: error });
      }

      res.send(posts);
    })
}

exports.create = function(req, res) {
  const post = new Post(req.body);

  post.save(function(error) {
    if (error) {
      return res.status(400).send({ message: error });
    }

    res.send('NEW: ' + req.body.title);
  });
}
