const {ExtractJwt} = require('passport-jwt'),
	{
		SECRET,
		PORT,
		URI,
		MONGO_USER,
		MONGO_PASSWORD,
		MONGO_DOMAIN,
		MONGO_DB
	} = process.env

module.exports= {
	jwt :{
		jwtFromRequest: ExtractJwt.fromHeader('authorization'),
		secretOrKey: SECRET || 'secret'
	},
	expiresIn :'10 days',
	port: PORT || 8080,
	mongoURI: MONGO_USER && MONGO_PASSWORD && MONGO_DOMAIN && MONGO_DB ?
	'mongdb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DOMAIN}/${MONGO_DB}'
	: 'mongodb://localhost/user_service'
}