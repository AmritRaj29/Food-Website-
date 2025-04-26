const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const auth = require('../middleware/auth');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ msg: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Search restaurants
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { cuisine: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Filter restaurants
router.post('/filter', async (req, res) => {
  try {
    const { cuisine, priceRange, rating, deliveryPlatform } = req.body;
    let filter = {};

    if (cuisine) filter.cuisine = cuisine;
    if (priceRange) filter.priceRange = priceRange;
    if (rating) filter.rating = { $gte: rating };
    if (deliveryPlatform) {
      filter['deliveryPlatforms.name'] = deliveryPlatform;
    }

    const restaurants = await Restaurant.find(filter);
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add review to restaurant
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ msg: 'Restaurant not found' });
    }

    const newReview = {
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    };

    restaurant.reviews.unshift(newReview);
    await restaurant.save();

    res.json(restaurant.reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 