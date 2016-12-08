const mongoose = require('mongoose'),
	{Schema} = mongoose,
	{hashSync, genSaltSync} = require('bcryptjs');
	createControllers = require('./utils/createControllers'),
	createRoutes = require('./utils/createRoutes');

//set up model
const userSchema = new Schema({
	email: {
		type: String,
		required:[true,'Must provide and email'],
		unique: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
 	},
 	username: {
	   type:String,
	   unique: true,
	   required: [true, 'Must provide a username'],
	},
	password:{
	   type: String,
	   required: [true, 'Must provide a password'],
	},
	admin: {
	   type:Boolean,
	   default: false
	}
});

userSchema.pre('save', function(next){
	this.password = hashSync(this.password, genSaltSync(10));
	next();
});

const User = mongoose.model('User', userSchema);
const controller = createControllers(User);
exports.userRoutes = createRoutes(controller, User);