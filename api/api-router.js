const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');




// api/auth
router.use('/auth', authRouter);
// api/users
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

router.get('/auth', (req, res) => {
  res.json({ auth: "It's alive" });
});


module.exports = router;