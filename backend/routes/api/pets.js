const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Pet } = require('../../db/models');
const router = express.Router();

// 🔹 Create a new pet
router.post('/', requireAuth, async (req, res) => {
	const {
		name,
		species,
		breed,
		age,
		weight,
		birthday,
		allergies,
		notes,
		image,
	} = req.body;
	const userId = req.user.id; // ✅ Get user ID from session

	try {
		const pet = await Pet.create({
			userId,
			name,
			species,
			breed,
			age,
			weight,
			birthday,
			allergies,
			notes,
			image,
		});
		return res.status(201).json(pet);
	} catch (error) {
		return res.status(500).json({ error: 'Failed to create pet' });
	}
});

// 🔹 Get all pets for logged-in user
router.get('/', requireAuth, async (req, res) => {
	try {
		const pets = await Pet.findAll({
			where: { userId: req.user.id },
		});
		return res.json({ pets });
	} catch (error) {
		return res.status(500).json({ error: 'Failed to fetch pets' });
	}
});

module.exports = router;
