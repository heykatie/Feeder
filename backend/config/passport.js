const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
// const fs = require('fs');
// const AppleStrategy = require('passport-apple').Strategy;
const User = require('../db/models/user')

const callbackBaseUrl =
	process.env.NODE_ENV === 'production'
		? process.env.APP_PROD_URL
		: process.env.APP_HOME_URL;

// Serialize user for session
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findByPk(id);
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

// Facebook OAuth Strategy
// passport.use(
// 	new FacebookStrategy(
// 		{
// 			clientID: process.env.FACEBOOK_CLIENT_ID,
// 			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
// 			callbackURL: `${callbackBaseUrl}${process.env.FACEBOOK_CALLBACK_URL}`,
// 			profileFields: ['id', 'displayName', 'emails', 'photos'],
// 		},
// 		async (accessToken, refreshToken, profile, done) => {
// 			try {
// 				const email = profile.emails?.[0]?.value || `${profile.id}@facebook.com`;

// 				const [user] = await User.findOrCreate({
// 					where: { facebookId: profile.id },
// 					defaults: {
// 						username: profile.displayName,
// 						email: email,
// 					},
// 				});

// 				done(null, user);
// 			} catch (err) {
// 				done(err, null);
// 			}
// 		}
// 	)
// );

passport.use(
	new DiscordStrategy(
		{
			clientID: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			callbackURL: `${callbackBaseUrl}${process.env.DISCORD_CALLBACK_URL}`,
			scope: ['identify', 'email'],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const email = profile.email || `${profile.id}@discord.com`;

				const [user] = await User.findOrCreate({
					where: { discordId: profile.id },
					defaults: { username: profile.username, email },
				});

				done(null, user);
			} catch (err) {
				done(err, null);
			}
		}
	)
);

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: `${callbackBaseUrl}${process.env.GOOGLE_CALLBACK_URL}`,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const email =
					profile.emails?.[0]?.value || `${profile.id}@google.com`;
				const [user] = await User.findOrCreate({
					where: { googleId: profile.id },
					defaults: {
						username: profile.displayName,
						email,
					},
				});
				done(null, user);
			} catch (err) {
				done(err, null);
			}
		}
	)
);

// Apple OAuth Strategy
// passport.use(
// 	new AppleStrategy(
// 		{
// 			clientID: process.env.APPLE_CLIENT_ID,
// 			teamID: process.env.APPLE_TEAM_ID,
// 			keyID: process.env.APPLE_KEY_ID,
// 			privateKey: fs.readFileSync(process.env.APPLE_PRIVATE_KEY_PATH, 'utf8'),
// 			callbackURL: `${callbackBaseUrl}${process.env.APPLE_CALLBACK_URL}`,
// 		},
// 		async (accessToken, refreshToken, idToken, profile, done) => {
// 			try {
// 				const email = profile.email || `${idToken.sub}@appleid.com`;

// 				const [user] = await User.findOrCreate({
// 					where: { appleId: idToken.sub },
// 					defaults: { username: profile.fullName?.givenName || 'AppleUser', email },
// 				});

// 				done(null, user);
// 			} catch (err) {
// 				done(err, null);
// 			}
// 		}
// 	)
// );

module.exports = passport;
