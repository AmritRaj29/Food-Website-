const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: [
      'recipes',
      'restaurant_reviews',
      'cooking_tips',
      'food_trends',
      'nutrition',
      'food_culture',
      'kitchen_essentials'
    ],
    required: true
  },
  tags: [String],
  images: [String],
  featuredImage: String,
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  shares: {
    type: Number,
    default: 0
  },
  relatedRecipes: [{
    name: String,
    description: String,
    ingredients: [String],
    instructions: [String],
    prepTime: String,
    cookTime: String,
    servings: Number,
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard']
    }
  }],
  seo: {
    metaDescription: String,
    keywords: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', BlogSchema); 