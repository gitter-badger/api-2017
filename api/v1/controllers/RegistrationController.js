var errors = require('../errors');
var services = require('../services');
var roles = require('../utils/roles');

var router = require('express').Router();

function registerUser (req, res, next) {
  var email = req.auth.email;
  services.UserService.findUserByEmail(email)
  .then(function(user){
    return services.RegistrationService
      .registerUser(user, req.body);
  })
  .then(function(registered){
    res.body = registered.toJSON();

    next();
    return null;
  })
  .catch(function (error) {
    next(error);
    return null;
  });
}

function updateRegistration (req, res, next) {
  var email = req.auth.email;
  services.UserService.findUserByEmail(email)
  .then(function(user){
    return services.RegistrationService.findRegistrationByUser(user);
  })
  .then(function(registration){
    return services.RegistrationService.updateRegistration(registration, req.body);
  })
  .then(function(updatedRegistration){
    res.body = updatedRegistration.toJSON();

    next();
    return null;
  })
  .catch(function (error){
    next(error);
    return null;
  });
}

function getRegistration(req, res, next) {
  var email = req.auth.email;
  services.UserService.findUserByEmail(email)
  .then(function(user){
    return services.RegistrationService.findRegistrationByUser(user);
  })
  .then(function(registration){
    res.body = registration.toJSON();

    next();
    return null;
  })
  .catch(function (error){
    next(error);
    return null;
  });
}

/**
 * Determines whether or not the requester is registering for the correct role.
 * @throws UnauthorizedError when user is attempting to register for a role
 * other than their own.
 */
function roleMatchesUser(req, res, next) {
  if(req.auth.role !== req.params.role.toUpperCase()){
    return next(new errors.UnauthorizedError());
  }

	// Otherwise, roles must match, and user is authorized
	next();
};

router.get('/:role', roleMatchesUser, getRegistration);
router.post('/:role', roleMatchesUser, registerUser);
router.put('/:role', roleMatchesUser, updateRegistration);

module.exports.registerUser = registerUser;
module.exports.updateRegistration = updateRegistration;
module.exports.getRegistration = getRegistration;
module.exports.router = router;
