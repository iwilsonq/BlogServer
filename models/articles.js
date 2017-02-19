const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  image: {
    type: String
  },
  imageId: {
    type: String
  },
  caption: {
    type: String
  },
  tags: [{
    type: String
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  content: {
    type: [String],
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

const Article = mongoose.model('article', articleSchema);

module.exports = Article;
