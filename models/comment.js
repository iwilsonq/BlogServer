const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, isRequired: true },
  name: { type: String, isRequired: true },
  createdAt: { type: Date, default: Date.now()}
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
