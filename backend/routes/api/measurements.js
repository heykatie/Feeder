const express = require('express');
const { Measurement } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const measurements = await Measurement.findAll({
			attributes: ['id', 'name', 'abbreviation'],
		});
		res.json(measurements);
	} catch (error) {
		console.error('Error fetching measurements:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;
