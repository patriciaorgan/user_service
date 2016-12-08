const router = require('express').Router(),
	passport = require('passport'),
	createStrategies = require('./createStrategies');

module.exports = (controller, User) =>{

 	const {_post, _get, _getOne, _params, _put, _delete, _user} = controller;
 // const {_authenticate, _delete, _get, _put, _post, _params, _user, _getOne} = controller;
 	createStrategies(User);

 	router.param('_id', _params);

 	router.get('/me', passport.authenticate('jwt', {session:false}), _user());

 	router.route('/')
 		.post(_post)
 		.get(_get);

 	router.route('/:_id')
 		.get(_getOne)
 		.put(_put)
 		.delete(_delete);

 	return router;
};