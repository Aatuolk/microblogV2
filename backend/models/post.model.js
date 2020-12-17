const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  username: { type: String, required: false },
  content: { type: String, required: true }
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;