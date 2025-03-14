const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, SousChef } = require('../../db/models');

const router = express.Router();

const validateLogin = [
	check('credential')
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage('Please provide a valid email or username.'),
	check('password')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a password.'),
	handleValidationErrors,
];

// router.get('/', restoreUser, async (req, res) => {
// 	const { user } = req;
// 	if (!user) return res.json({ user: null });

// 	const restoredUser = await User.findByPk(user.id, {
// 		attributes: { exclude: ['hashedPassword'] },
// 		include: [{ model: SousChef }],
// 	});

// 	// const safeUser = {
// 	// 	id: user.id,
// 	// 	email: user.email,
// 	// 	username: user.username,
// 	// 	firstName: user.firstName || null,
// 	// 	lastName: user.lastName || null,
// 	// 	phone: user.phone || null,
// 	// 	birthday: user.birthday || null,
// 	// 	avatarUrl: user.avatarUrl || null,
// 	// 	bio: user.bio || null,
// 	// 	theme: user.theme || null,
// 	// 	sousChef: user.SousChef || null,
// 	// };
// 	if (!restoredUser) {
// 		return res.status(404).json({ error: 'User not found' });
// 	}

// 	return res.json({ user: restoredUser });
// });

router.get('/', restoreUser, async (req, res) => {
	// console.log('🔍 Session Middleware Restoring User:', req.user);

	if (!req.user) {
		// console.error('❌ No user found in session.');
		return res.json({ user: null });
	}

	try {
		const restoredUser = await User.findByPk(req.user.id, {
			attributes: { exclude: ['hashedPassword'] },
			include: [{ model: SousChef }],
		});

		if (!restoredUser) {
			// console.error('❌ User not found in database.');
			return res.status(404).json({ error: 'User not found' });
		}

		// console.log('✅ Returning user from session:', restoredUser.toJSON());
		return res.json({ user: restoredUser });
	} catch (err) {
		// console.error('🚨 Error fetching user for session restore:', err);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});


router.post('/', validateLogin, async (req, res, next) => {
	const { credential, password } = req.body;

	if (!credential || !password) {
		return res
			.status(400)
			.json({
				errors: {
					credential: 'Missing email or username.',
					password: 'Missing password.',
				},
			});
	}

	const user = await User.unscoped().findOne({
		where: {
			[Op.or]: {
				username: credential,
				email: credential,
			},
		},
		include: [{ model: SousChef }],
	});

	if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
		const err = new Error('Login failed');
		err.status = 401;
		err.title = 'Login failed';
		err.errors = { credential: 'Invalid credentials.' };
		return next(err);
	}

	// const safeUser = {
	// 	id: user.id,
	// 	email: user.email,
	// 	username: user.username,
	// 	firstName: user.firstName || null,
	// 	lastName: user.lastName || null,
	// 	phone: user.phone || null,
	// 	birthday: user.birthday || null,
	// 	avatarUrl: user.avatarUrl || null,
	// 	bio: user.bio || null,
	// 	theme: user.theme || null,
	// 	sousChef: user.SousChef || null,
	// };

	await setTokenCookie(res, user);

	req.session.userId = user.id;

	return res.json({
		user: user,
	});
});

// Log out
router.delete('/', (req, res) => {
	req.session.destroy(() => {
		res.clearCookie('token');
		return res.json({ message: 'Logout successful' });
	});
});

// router.delete('/', (_req, res) => {
// 	res.clearCookie('token');
// 	return res.json({ message: 'success' });
// });

module.exports = router;
