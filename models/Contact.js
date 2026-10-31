const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please add your email'],
      trim: true,
      lowercase: true
    },
    message: {
      type: String,
      required: [true, 'Please add a message']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
