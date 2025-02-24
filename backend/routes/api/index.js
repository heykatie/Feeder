const router = require('express').Router();
const {
	restoreUser,
	requireAuth,
	setTokenCookie,
} = require('../../utils/auth.js');
const { User } = require('../../db/models');
const oauthRouter = require('./oauth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const petsRouter = require('./pets');
const sousChefsRouter = require('./souschefs.js')

router.use(restoreUser);
router.use('/oauth', oauthRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/pets', petsRouter);
router.use('/souschefs', sousChefsRouter);


// GET /api/restore-user
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// test GET /api/require-auth
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// test GET /api/set-token-cookie
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
// 		where: {
// 			username: 'demo-lition',
// 		},
//   });
//   if (!user) {
//     return res.status(404).json({ error: 'Demo user not found' });
//   }
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });


// test route
// router.post('/test', function (req, res) {
// 	res.json({ requestBody: req.body });
// });

module.exports = router;
