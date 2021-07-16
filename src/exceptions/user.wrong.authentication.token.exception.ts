import HttpException from './http.exceptions'

class UserWrongAuthenticationTokenException extends HttpException {
	constructor() {
		super(401, 'Wrong authentication token')
	}
}

export default UserWrongAuthenticationTokenException
