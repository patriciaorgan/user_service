const passport = require('passport'),
	LocalStrategy = require('passport-local'),
	{ExtractJwt, Strategy} = require('passport-jwt'),
	{compareSync} = require('bcryptjs'),
	{jwt} = require('../../config');

module.exports = User => {

	// passport.use('local', new LocalStrategy( (username, password, done) => User.findOne({username})
		// .then(userFromDB => compareSync(password, userFromDB.password) 
		// 	? done(null, userFromDB)
		// 	: done(null,false))
		// .catch(e => done(e))));

	passport.use('jwt', new Strategy(jwt, (payload, done) => {
		User.findById(payload._id).select('-password')
			.then( userFromDB => userFromDB ? done(null, userFromDB) : done(null, false));
	}))


};
