const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['science', 'math', 'tech', 'language', 'history', 'other']
    },
    type: {
      type: String,
      default: 'document',
      enum: ['pdf', 'video', 'code', 'presentation', 'document', 'image', 'other']
    },
    author: {
      type: String,
      default: 'Anonymous'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resource', resourceSchema);
