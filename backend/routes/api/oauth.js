const express = require('express');
const passport = require('passport');
// const { ensureAuthenticated } = require('../middleware/auth');
const router = express.Router();

// // Facebook OAuth Routes
// router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
// ;
// router.get(
// 	'/facebook/callback',
// 	passport.authenticate('facebook', {
// 		failureRedirect: '/login',
// 		session: true, // Enables session support
// 	}),
// 	(req, res) => {
// 		if (!req.user) {
// 			console.error('Facebook OAuth failed');
// 			return res.status(401).json({ error: 'Authentication failed' });
// 		}
// 		res.redirect('/dashboard'); // Redirect to dashboard after login
// 	}
// );


// Discord OAuth Routes
router.get('/discord', passport.authenticate('discord'));

router.get(
	'/discord/callback',
	passport.authenticate('discord', {
		failureRedirect: '/login',
		session: true,
	}),
	(req, res) => {
		if (!req.user) {
			console.error('Discord OAuth failed');
			return res.status(401).json({ error: 'Authentication failed' });
		}
		res.redirect('/dash'); // Redirect to dashboard after login
	}
);

// Google Routes
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/login',
		session: true, // Enables session support for Google login
	}),
	(req, res) => {
		// Successful login, redirect to the homepage or dashboard
		res.redirect('/dash');
	}
);

// router.get('/apple', passport.authenticate('apple'));
// router.post(
// 	'/apple/callback',
// 	passport.authenticate('apple', {
// 		failureRedirect: '/login',
// 		session: true,
// 	}),
// 	(req, res) => {
// 		if (!req.user) {
// 			console.error('Apple OAuth failed');
// 			return res.status(401).json({ error: 'Authentication failed' });
// 		}
// 		res.redirect('/dashboard');
// 	}
// );


module.exports = router;
