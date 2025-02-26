const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Pet } = require('../../db/models');
const router = express.Router();

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
	const userId = req.user.id;

	if (!name || !species || !userId) {
		return res.status(400).json({
			message: 'Name and species are required.',
		});
	}

	try {
		const pet = await Pet.create({
			userId,
			name: name,
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

router.put('/:petId', requireAuth, async (req, res) => {
	const { petId } = req.params;
	const userId = req.user.id;
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

	try {
		const pet = await Pet.findOne({ where: { id: petId, userId } });

		if (!pet) {
			return res.status(404).json({ message: 'Pet not found' });
		}

		// Update pet attributes
		await pet.update({
			name: name || pet?.name,
			species: species || pet?.species,
			breed: breed || pet?.breed,
			age: age !== undefined ? age : pet?.age,
			weight: weight !== undefined ? weight : pet?.weight,
			birthday: birthday || pet?.birthday,
			allergies: allergies || pet?.allergies,
			notes: notes || pet?.notes,
			image: image || pet?.image,
		});

		return res.json(pet);
	} catch (error) {
		if (error.name == 'SequelizeValidationError') {
			return res
				.status(500)
				.json({ message: error.message || 'Failed to update pet' });
		} else {
			return res.status(500).json(error.errors || 'Failed to update pet');
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
