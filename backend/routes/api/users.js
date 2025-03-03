const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, SousChef } = require('../../db/models');

const router = express.Router();

const validateSignup = [
	check('email')
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage('Please provide a valid email.'),
	check('username')
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage('Please provide a username with at least 4 characters.'),
	check('username')
		.not()
		.isEmail()
		.withMessage('Username cannot be an email.'),
	check('password')
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage('Password must be 6 characters or more.'),
	handleValidationErrors,
];

router.post('/', validateSignup, async (req, res) => {
	const { email, password, username } = req.body;

	try {
		const hashedPassword = bcrypt.hashSync(password);
		const user = await User.create({ email, username, hashedPassword });

		const responseUser = await User.findByPk(user.id, {
			attributes: { exclude: ['hashedPassword'] },
			include: [{ model: SousChef }],
		});

		await setTokenCookie(res, responseUser);

		return res.status(201).json({ user: responseUser });
	} catch (error) {
		return res
			.status(500)
			.json({ message: error.errors[0].message || 'Error signing up' });
	}
});

router.put('/:userId', requireAuth, async (req, res) => {
	const { userId } = req.params;
	const { firstName, lastName, phone, birthday, avatarUrl, bio, theme } = req.body;

	try {
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		await user.update({ firstName, lastName, phone, birthday, avatarUrl, bio, theme });

		const updatedUser = await User.findByPk(user.id, {
			attributes: { exclude: ['hashedPassword'] },
			include: [{ model: SousChef }],
		});

		return res.json({ user: updatedUser });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error updating user profile' });
	}
});

router.get(
	'/', restoreUser, requireAuth, async (req, res) => {
		const { user } = req;
		if (user) {

			const restoredUser = await User.findByPk(user.id, {
				attributes: { exclude: ['hashedPassword'] },
				include: [{ model: SousChef }],
			});

			return res.json({
				user: restoredUser,
			});
		} else return res.json({ user: null });
	}
);

module.exports = router;
