const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Pet } = require('../../db/models');
const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
	const {
		petName,
		species,
		breed,
		age,
		weight,
		birthday,
		allergies,
		notes,
		image,
	} = req.body;
	const userId = req.user.id;

	if (!petName || !species || !userId) {
		return res.status(400).json({
			message: 'Name and species are required.',
		});
	}

	try {
		const pet = await Pet.create({
			userId,
			name: petName,
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
		if (error.name == 'SequelizeValidationError') {
			return res
				.status(500)
				.json({ message: error.message || 'Failed to create pet' });
		} else {
			return res.status(500).json(error.errors || 'Failed to create pet');
		}
	}
});

router.get('/', requireAuth, async (req, res) => {
	try {
		const pets = await Pet.findAll({
			where: { userId: req.user.id },
		});
		return res.json({ pets });
	} catch (error) {
		if (error.name == 'SequelizeValidationError') {
			return res
				.status(500)
				.json({ message: error.message || 'Failed to fetch pets' });
		} else {
			return res.status(500).json(error.errors || 'Failed to fetch pets');
		}
	}
});

router.delete('/:petId', requireAuth, async (req, res) => {
	const { petId } = req.params;
	const userId = req.user.id;

	try {
		const pet = await Pet.findOne({ where: { id: petId, userId } });

		if (!pet) {
			return res.status(404).json({ error: 'Pet not found' });
		}

		await pet.destroy();
		return res.json({ message: 'Pet deleted successfully', petId });
	} catch (error) {
		return res
			.status(500)
			.json({ message: error.message || 'Failed to delete pet' });
	}
});

module.exports = router;
