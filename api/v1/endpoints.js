var requests = require('./requests');

var endpoints = {};

endpoints['/v1/user/attendee'] = {
	POST: requests.BasicAuthRequest
};
endpoints['/v1/user/accredited'] = {
	POST: requests.AccreditedUserCreationRequest
};
endpoints['/v1/user/reset'] = {
	POST: requests.ResetTokenRequest
};
endpoints['/v1/auth/reset'] = {
	POST: requests.ResetPasswordRequest
};
endpoints['/v1/auth'] = {
	POST: requests.BasicAuthRequest
};
endpoints['/v1/upload/resume'] = {
	POST: requests.UploadRequest
};
endpoints['/v1/upload/resume/:id'] = {
	PUT: requests.UploadRequest
};

module.exports = endpoints;
