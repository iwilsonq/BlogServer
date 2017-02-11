const Article = require('../models/articles');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'iwilsonq',
  api_key: '523783848114792',
  api_secret: 'NbwOB2G9tYRb4XtO7P-L27hHWPY'
});

exports.list = (req, res) => {
  Article.find()
    .sort('-created')
    .exec(function(error, articles) {
      if (error) {
        return res.status(400).send({ message: error });
      }

      res.send(articles);
    })
}

exports.find = (req, res) => {
  const title = req.params.title
  Article.findOne({ title }, (err, article) => {
    if (err) res.send(err);

    res.send(article);
  });
}

exports.create = (req, res) => {
  cloudinary.uploader.upload(req.file.path, result => {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      image: result.url,
      imageId: result.public_id
    });

    article.save(err => {
      if (err) res.send(err);

      res.send('NEW: ' + req.body.title);
    });
  });
}

exports.edit = (req, res) => {
  const imageId = req.params.id;
  Article.findOneAndUpdate({ imageId }, Object.assign({}, req.body), err => {
    if (err) res.send(err);
    res.send('UPDATED: ' + req.body.title);
  })
}

exports.destroy = (req, res) => {
  const imageId = req.params.id;
  cloudinary.uploader.destroy(imageId, (err, result) => {
    Article.findOneAndRemove({ imageId }, error => {
      if (error) res.send(error);
      res.send('REMOVED: ' + imageId);
    })
  })
}
