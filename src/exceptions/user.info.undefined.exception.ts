import HttpException from './http.exceptions'

class UserInfoUndefinedInfoException extends HttpException {
	constructor() {
		super(400, 'user info is not defined')
	}
}

export default UserInfoUndefinedInfoException
