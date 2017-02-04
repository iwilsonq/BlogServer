const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: false },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
