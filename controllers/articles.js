const Article = require('../models/articles');
const cloudinary = require('cloudinary');

let cloudConfig;
if (process.env.NODE_ENV !== 'production') {
  cloudConfig = require('../config').cloudinary;
} else {
  cloudConfig = process.env.CLOUDINARY_URL;
}

cloudinary.config(cloudConfig);

exports.list = (req, res) => {
  Article.find()
    .sort('-created')
    .exec(function(error, articles) {
      if (error) {
        return res.status(400).send({ message: error });
      }
      res.send(articles);
    });
}

exports.find = (req, res) => {
  const title = req.params.title
  Article.findOne({ title }, (err, article) => {
    if (err) res.send(err);

    res.send(article);
  });
}

exports.create = (req, res) => {
  const formattedContent = JSON.parse(req.body.content).filter(p => p !== "");
  console.log()
  cloudinary.uploader.upload(req.file.path, result => {
    const article = new Article({
      title: req.body.title,
      content: formattedContent,
      caption: req.body.caption,
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
