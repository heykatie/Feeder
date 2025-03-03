const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, SousChef } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
	// Create the token.
	const safeUser = {
		id: user.id,
		email: user.email,
		username: user.username,
	};
	const token = jwt.sign(
		{ data: safeUser },
		secret,
		{ expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
	);

	const isProduction = process.env.NODE_ENV === 'production';

	// Set the token cookie
	res.cookie('token', token, {
		maxAge: expiresIn * 1000, // maxAge in milliseconds
		httpOnly: true,
		secure: isProduction,
		sameSite: isProduction && 'Lax',
	});

	return token;
};

const restoreUser = async (req, res, next) => {
	console.log('🛠 Checking session:', req.session);
	console.log(
		'🛠 Checking session passport.user:',
		req.session?.passport?.user
	);

	if (!req.session?.passport?.user) {
		console.error('❌ No user found in session.');
		return next();
	}

	try {
		const user = await User.findByPk(req.session.passport.user, {
			attributes: { exclude: ['hashedPassword'] },
			include: [{ model: SousChef }],
		});

		if (!user) {
			console.error('❌ User not found in database.');
			return next();
		}

		console.log('✅ User restored from session:', user.toJSON());
		req.user = user;
		return next();
	} catch (err) {
		console.error('🚨 Error restoring user:', err);
		return next();
	}
};

// const restoreUser = (req, res, next) => {
// 	// token parsed from cookies
// 	const { token } = req.cookies;
// 	req.user = null;

// 	// if (!token) {
// 	// 	req.user = null;
// 	// 	return next();
// 	// }

// 	return jwt.verify(token, secret, null, async (err, jwtPayload) => {
// 		if (err) {
// 			return next();
// 		}

// 		try {
// 			const { id } = jwtPayload.data;
// 			req.user = await User.findByPk(id, {
// 				attributes: {
// 					include: ['email', 'createdAt', 'updatedAt'],
// 				},
// 			});
// 		} catch (e) {
// 			res.clearCookie('token');
// 			return next();
// 		}

// 		if (!req.user) res.clearCookie('token');

// 		return next();
// 	});
// };

// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
	if (req.user) return next();

	const err = new Error('Authentication required');
	err.title = 'Authentication required';
	err.errors = { message: 'Authentication required' };
	err.status = 401;
	return next(err);
};

module.exports = { setTokenCookie, restoreUser, requireAuth };
