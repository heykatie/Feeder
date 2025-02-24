const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//backend validation for signup
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

// Update user profile
router.put('/:userId', requireAuth, async (req, res) => {
	const { userId } = req.params;
	const { firstName, lastName, phone, birthday, avatarUrl, bio, theme } = req.body;

	try {
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Update user details
		await user.update({ firstName, lastName, phone, birthday, avatarUrl, bio, theme });

		// Return updated user
		const safeUser = {
			id: user.id,
			email: user.email,
			username: user.username,
			firstName: user.firstName || null,
			lastName: user.lastName || null,
			phone: user.phone || null,
			birthday: user.birthday || null,
			avatarUrl: user.avatarUrl || null,
			bio: user.bio || null,
			theme: user.theme || null,
		};

		return res.json({ user: safeUser });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error updating user profile' });
	}
});

// Sign up
router.post('/', validateSignup, async (req, res) => {
	const { email, password, username } = req.body;

	const hashedPassword = bcrypt.hashSync(password);
	const user = await User.create({ email, username, hashedPassword });

	const safeUser = {
		id: user.id,
		email: user.email,
		username: user.username,
		firstName: user.firstName || null,
		lastName: user.lastName || null,
		phone: user.phone || null,
		birthday: user.birthday || null,
		avatarUrl: user.avatarUrl || null,
		bio: user.bio || null,
		theme: user.theme || null,
		sousChef: user.SousChef || null,
	};

	await setTokenCookie(res, safeUser);

	return res.json({
		user: safeUser,
	});
});

// Restore session user
router.get(
	'/',
	async (req, res) => {
		const { user } = req;
		if (user) {

			const safeUser = {
				id: user.id,
				email: user.email,
				username: user.username,
				firstName: user.firstName || null,
				lastName: user.lastName || null,
				phone: user.phone || null,
				birthday: user.birthday || null,
				avatarUrl: user.avatarUrl || null,
				bio: user.bio || null,
				theme: user.theme || null,
				sousChef: user.SousChef || null
			};
			return res.json({
				user: safeUser
			});
		} else return res.json({ user: null });
	}
);

module.exports = router;
