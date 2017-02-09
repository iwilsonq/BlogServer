const Article = require('../models/articles');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'iwilsonq',
  api_key: '523783848114792',
  api_secret: 'NbwOB2G9tYRb4XtO7P-L27hHWPY'
});

exports.list = function(req, res) {
  Article.find()
    .sort('-created')
    .exec(function(error, articles) {
      if (error) {
        return res.status(400).send({ message: error });
      }

      res.send(articles);
    })
}

exports.create = function(req, res) {
  cloudinary.uploader.upload(req.file.path, result => {

    console.log(result);
  });

  // article.save(function(error) {
  //   if (error) {
  //     return res.status(400).send({ message: error });
  //   }
  //
  //   res.send('NEW: ' + req.body.title);
  // });
}
