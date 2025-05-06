const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  ingredients: [{
    name: String,
    quantity: String,
    unit: String,
    notes: String
  }],
  instructions: [{
    step: Number,
    description: String,
    image: String
  }],
  prepTime: String,
  cookTime: String,
  totalTime: String,
  servings: Number,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard']
  },
  cuisine: [String],
  dietaryInfo: [String],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
    sugar: Number,
    sodium: Number
  },
  images: [String],
  video: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tips: [String],
  variations: [{
    name: String,
    description: String,
    modifications: [String]
  }],
  equipment: [String],
  tags: [String],
  relatedRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
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

module.exports = mongoose.model('Recipe', RecipeSchema); 
