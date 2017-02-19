const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, isRequired: true },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now()}
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
