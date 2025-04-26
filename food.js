const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Compare food items across platforms
router.post('/compare', async (req, res) => {
  try {
    const { foodName, location } = req.body;
    
    // Find restaurants that have the food item
    const restaurants = await Restaurant.find({
      'menu.name': { $regex: foodName, $options: 'i' },
      'address.city': location
    });

    // Extract and compare food items
    const comparisons = restaurants.map(restaurant => {
      const foodItem = restaurant.menu.find(item => 
        item.name.toLowerCase().includes(foodName.toLowerCase())
      );
      
      return {
        restaurant: restaurant.name,
        foodItem: foodItem.name,
        price: foodItem.price,
        rating: foodItem.rating,
        deliveryPlatforms: restaurant.deliveryPlatforms.map(platform => ({
          name: platform.name,
          deliveryFee: platform.deliveryFee,
          deliveryTime: platform.deliveryTime,
          totalPrice: foodItem.price + platform.deliveryFee
        }))
      };
    });

    // Sort by total price
    comparisons.sort((a, b) => {
      const minPriceA = Math.min(...a.deliveryPlatforms.map(p => p.totalPrice));
      const minPriceB = Math.min(...b.deliveryPlatforms.map(p => p.totalPrice));
      return minPriceA - minPriceB;
    });

    res.json(comparisons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get food recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const { cuisine, priceRange, dietaryPreferences } = req.query;
    let filter = {};

    if (cuisine) filter.cuisine = cuisine;
    if (priceRange) filter.priceRange = priceRange;

    const restaurants = await Restaurant.find(filter);
    
    // Get food items matching criteria
    const recommendations = restaurants.flatMap(restaurant => 
      restaurant.menu
        .filter(item => {
          if (!dietaryPreferences) return true;
          return dietaryPreferences.every(pref => 
            item.dietaryInfo.includes(pref)
          );
        })
        .map(item => ({
          restaurant: restaurant.name,
          foodItem: item.name,
          price: item.price,
          rating: item.rating,
          image: item.image,
          description: item.description
        }))
    );

    // Sort by rating
    recommendations.sort((a, b) => b.rating - a.rating);
    
    res.json(recommendations.slice(0, 10)); // Return top 10 recommendations
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Placeholder routes
router.get('/', (req, res) => {
    res.json({ message: 'Get all food items' });
});

router.get('/:id', (req, res) => {
    res.json({ message: 'Get food item by ID' });
});

module.exports = router; 