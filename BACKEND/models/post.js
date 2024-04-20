const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  portfolio_name: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  contact_no: {
    type: String,
    require: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  },
});

module.exports = mongoose.model('Post', postSchema);
