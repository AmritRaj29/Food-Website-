const mongoose = require('mongoose');

const SocialShareSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: {
      type: String,
      enum: ['restaurant', 'food', 'recipe', 'blog', 'review'],
      required: true
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  platform: {
    type: String,
    enum: ['facebook', 'twitter', 'instagram', 'pinterest', 'whatsapp', 'email'],
    required: true
  },
  message: String,
  images: [String],
  tags: [String],
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SocialShare', SocialShareSchema); 
