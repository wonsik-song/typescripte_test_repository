import HttpException from './http.exceptions'

class UnknownInternalException extends HttpException {
	constructor() {
		super(400, 'internal unknown exception')
	}
}

export default UnknownInternalException
