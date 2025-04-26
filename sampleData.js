const Restaurant = require('../models/Restaurant');

const sampleRestaurants = [
  {
    name: "Taste of India",
    description: "Authentic Indian cuisine with a modern twist",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    cuisine: ["Indian", "Vegetarian", "Vegan"],
    rating: 4.5,
    priceRange: "$$",
    openingHours: {
      monday: { open: "11:00", close: "22:00" },
      tuesday: { open: "11:00", close: "22:00" },
      wednesday: { open: "11:00", close: "22:00" },
      thursday: { open: "11:00", close: "22:00" },
      friday: { open: "11:00", close: "23:00" },
      saturday: { open: "11:00", close: "23:00" },
      sunday: { open: "11:00", close: "22:00" }
    },
    deliveryPlatforms: [
      {
        name: "UberEats",
        rating: 4.3,
        deliveryTime: "30-45 min",
        deliveryFee: 2.99,
        minimumOrder: 15.00
      },
      {
        name: "DoorDash",
        rating: 4.5,
        deliveryTime: "25-40 min",
        deliveryFee: 3.99,
        minimumOrder: 12.00
      }
    ],
    menu: [
      {
        name: "Butter Chicken",
        description: "Tender chicken in rich tomato and butter sauce",
        price: 16.99,
        category: "Main Course",
        dietaryInfo: ["Non-Vegetarian"],
        rating: 4.7,
        image: "butter-chicken.jpg"
      },
      {
        name: "Vegetable Biryani",
        description: "Fragrant basmati rice with mixed vegetables",
        price: 14.99,
        category: "Main Course",
        dietaryInfo: ["Vegetarian", "Vegan"],
        rating: 4.5,
        image: "veg-biryani.jpg"
      }
    ]
  },
  {
    name: "Pasta Paradise",
    description: "Italian cuisine with homemade pasta",
    address: {
      street: "456 Broadway",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      coordinates: {
        lat: 40.7140,
        lng: -74.0062
      }
    },
    cuisine: ["Italian", "Mediterranean"],
    rating: 4.6,
    priceRange: "$$$",
    openingHours: {
      monday: { open: "12:00", close: "22:00" },
      tuesday: { open: "12:00", close: "22:00" },
      wednesday: { open: "12:00", close: "22:00" },
      thursday: { open: "12:00", close: "22:00" },
      friday: { open: "12:00", close: "23:00" },
      saturday: { open: "12:00", close: "23:00" },
      sunday: { open: "12:00", close: "22:00" }
    },
    deliveryPlatforms: [
      {
        name: "Grubhub",
        rating: 4.4,
        deliveryTime: "35-50 min",
        deliveryFee: 4.99,
        minimumOrder: 20.00
      },
      {
        name: "Postmates",
        rating: 4.2,
        deliveryTime: "30-45 min",
        deliveryFee: 3.99,
        minimumOrder: 15.00
      }
    ],
    menu: [
      {
        name: "Spaghetti Carbonara",
        description: "Classic pasta with eggs, cheese, pancetta, and black pepper",
        price: 18.99,
        category: "Main Course",
        dietaryInfo: ["Non-Vegetarian"],
        rating: 4.8,
        image: "carbonara.jpg"
      },
      {
        name: "Margherita Pizza",
        description: "Traditional pizza with tomato sauce, mozzarella, and basil",
        price: 16.99,
        category: "Main Course",
        dietaryInfo: ["Vegetarian"],
        rating: 4.6,
        image: "margherita.jpg"
      }
    ]
  }
];

// Function to populate database with sample data
const populateDatabase = async () => {
  try {
    await Restaurant.deleteMany({});
    await Restaurant.insertMany(sampleRestaurants);
    console.log('Database populated with sample data');
  } catch (err) {
    console.error('Error populating database:', err);
  }
};

module.exports = { populateDatabase }; 