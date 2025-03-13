const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { SousChef } = require('../../db/models');
const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
	const { name, color, personality, eyeShape } = req.body;
	const userId = req.user.id;

	try {
		const sousChef = await SousChef.create({
			userId,
			name,
			color,
			personality,
			eyeShape,
		});
		return res.status(201).json(sousChef);
	} catch (error) {
		return res.status(500).json({ error: 'Failed to create SousChef' });
	}
});

router.get('/', requireAuth, async (req, res) => {
	try {
		const sousChef = await SousChef.findOne({
			where: { userId: req.user.id },
		});
		return res.json({ sousChef });
	} catch (error) {
		return res.status(500).json({ error: 'Failed to fetch SousChef' });
	}
});

router.put('/:sousChefId', requireAuth, async (req, res) => {
	const { sousChefId } = req.params;

	try {
		const sousChef = await SousChef.findByPk(sousChefId);

		if (!sousChef) {
			return res.status(404).json({ error: 'SousChef not found' });
		}

		if (sousChef.userId !== req.user.id) {
			return res.status(403).json({ error: 'Unauthorized' });
		}

		await sousChef.update(req.body);
		const updatedSousChef = await SousChef.findByPk(sousChefId);
		return res.json(updatedSousChef);
	} catch (error) {
		return res.status(500).json({ error: 'Failed to update SousChef' });
	}
});

router.put('/:id/xp', async (req, res) => {
	try {
		const { id } = req.params;
		const { xp } = req.body;

		const sousChef = await SousChef.findByPk(id);
		if (!sousChef)
			return res.status(404).json({ error: 'SousChef not found' });

		// Update XP and save
		sousChef.xp += xp;
		await sousChef.save();

		res.json({ xp: sousChef.xp });
	} catch (error) {
		console.error('Error updating XP:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});


module.exports = router;
