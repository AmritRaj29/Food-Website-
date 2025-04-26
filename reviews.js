const express = require('express');
const router = express.Router();

// Placeholder routes
router.post('/', (req, res) => {
    res.json({ message: 'Create new review' });
});

router.get('/:id', (req, res) => {
    res.json({ message: 'Get review by ID' });
});

module.exports = router; 