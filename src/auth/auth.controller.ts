import { AuthService } from './auth.service'
import { UserDto } from '../user/userDTO'
import { UserService } from '../user/user.service'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import Controller from '../interfaces/controller.interface'
import { Router, Request, Response, NextFunction } from 'express'
import UserInfoUndefinedInfoException from '../exceptions/user.info.undefined.exception'
import UserEmailExistsException from '../exceptions/user.mail.exist.exception'
import UnknownInternalException from '../exceptions/unknown.internal.exception'
import UserWrongAuthenticationTokenException from '../exceptions/user.wrong.authentication.token.exception'

@injectable()
export class AuthController implements Controller {
	public path = '/auth'
	public router = Router()

	constructor(
		@inject(TYPES.UserService) private userService: UserService,
		@inject(TYPES.AuthService) private authService: AuthService,
	) {
		this.initializeRoutes()
	}

	private initializeRoutes() {
		this.router.post(`${this.path}/register`, this.register)
	}

	// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public register = (req: Request, res: Response, next: NextFunction) => {
		const { email, password, token } = req.body

		const userDto = new UserDto(token, email, password)

		if (!userDto.isInfoValidation()) {
			next(new UserInfoUndefinedInfoException())
		} else {
			try {
				const userData = this.userService.findUser(userDto.email)
				if (userData) {
					next(new UserEmailExistsException(userDto.email))
				} else {
					if (!this.authService.verifyAccountToken(userDto)) {
						next(new UserWrongAuthenticationTokenException())
					}
					this.userService.registerUser(userDto)

					res.json({
						message: 'registered successfully',
						email: email,
					})
				}
			} catch (error) {
				next(new UnknownInternalException())
			}
		}
	}

	// public login = (req: Request, res: Response) => {
	// 	const { email, password } = req.body
	// 	const userDto: UserDto = new UserDto('', email, password)
	// 	const secret = req.app.get('jwt-secret')

	// 	try {
	// 		const userData = this.userService.findUser(userDto.email)
	// 		if (!userData) {
	// 			throw new Error('login failed')
	// 		} else {
	// 			if (this.authService.verifyPassword(userData.password, userDto.password)) {
	// 				const token = this.authService.generateToken(userDto, secret)
	// 				res.json({
	// 					message: 'logged in successfully',
	// 					token,
	// 				})
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.log('error:', error)
	// 		res.status(403).json({
	// 			message: error.message,
	// 		})
	// 	}
	// 	return false
	// }
}
