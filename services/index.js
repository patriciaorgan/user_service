const router = require('express').Router(),
	{userRoutes} = require('./user');

router.use('/users', userRoutes);

module.exports = router;