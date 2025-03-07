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
	const { token } = req.cookies;
	req.user = null;

	try {
		// Check if the user is authenticated via session (OAuth users)
		if (req.session?.passport?.user) {
			console.log(
				// '🔍 Restoring OAuth user from session:',
				req.session.passport.user
			);

			req.user = await User.findByPk(req.session.passport.user, {
				attributes: { exclude: ['hashedPassword'] },
				include: [{ model: SousChef }],
			});

			if (!req.user) {
				// console.error('❌ OAuth User not found in database.');
				return next();
			}

			// console.log('✅ OAuth User restored:', req.user.id);
			return next();
		}

		// Check if the user is authenticated via JWT (Regular users)
		if (token) {
			return jwt.verify(token, secret, null, async (err, jwtPayload) => {
				if (err) {
					// console.error('❌ Invalid JWT token.');
					res.clearCookie('token');
					return next();
				}

				try {
					const { id } = jwtPayload.data;
					req.user = await User.findByPk(id, {
						attributes: { exclude: ['hashedPassword'] },
						include: [{ model: SousChef }],
					});

					if (!req.user) {
						// console.error('❌ Regular user not found in database.');
						res.clearCookie('token');
						return next();
					}

					// console.log('✅ Regular User restored:', req.user.id);
					return next();
				} catch (err) {
					// console.error('🚨 Error restoring regular user:', err);
					res.clearCookie('token');
					return next();
				}
			});
		}

		// console.warn('⚠️ No session or token found. User not authenticated.');
		return next();
	} catch (err) {
		// console.error('🚨 Unexpected error in restoreUser:', err);
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
