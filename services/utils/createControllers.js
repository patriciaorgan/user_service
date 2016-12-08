const {sign} = require('jsonwebtoken'),
	{secretOrKey, expiresIn} = require('../../config').jwt,
	signToken = payload => sign(payload,secretOrKey,expiresIn);

module.exports = Model =>({
	_params: (req, res, next, _id)  => Model.findById(_id).then(modelFromDB => {
		modelFromDB ? req.model = modelFromDB : res.status(400).send('No docs with that id');
		next();
	}),

	_user: () => (req, res) => res.json(req.user),

	_post: (req, res) => new Model(req.body).save()
		.then(modelFromDB => res.json({model: modelFromDB, token: signToken({_id:modelFromDB._id})}))
		.catch(e => res.status(400).send(e)),

	_get: (req, res) => Model.find().select('-password')
		.then(models => res.json(models))
		.catch(e => res.status(400).send(e)),

	_getOne: (req, res) => Model.findById(req.params._id).select('-password')
		.then(model => res.json(model))
		.catch(e => res.status(400).send(e)),

	_put: (req, res) => Object.assign(req.model, req.body).save()
		.then(updatedModel => res.json(updatedModel))
		.catch(e => res.status(400).send(e)),

	_delete: (req, res) => Model.findByIdAndRemove(req.params._id)
		.then(deletedModel => res.json(deletedModel))
		.catch(e => res.status(400).send(e))


});
