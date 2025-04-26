const mongoose = require('mongoose');

const PriceAlertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foodItem: {
    name: String,
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    },
    currentPrice: Number
  },
  targetPrice: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    enum: ['below', 'above', 'equal'],
    required: true
  },
  deliveryPlatforms: [{
    name: String,
    currentPrice: Number,
    deliveryFee: Number
  }],
  status: {
    type: String,
    enum: ['active', 'triggered', 'cancelled'],
    default: 'active'
  },
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: false
    }
  },
  lastChecked: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PriceAlert', PriceAlertSchema); 