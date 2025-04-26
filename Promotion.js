const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: [
      'percentage_off',
      'fixed_amount',
      'free_delivery',
      'buy_one_get_one',
      'combo_deal',
      'loyalty_points_multiplier'
    ],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  applicableTo: {
    restaurants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    }],
    cuisines: [String],
    foodItems: [String],
    minimumOrderAmount: Number
  },
  conditions: {
    maxUses: Number,
    perUserLimit: Number,
    validDays: [String],
    validHours: {
      start: String,
      end: String
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'expired'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Promotion', PromotionSchema); 