import 'reflect-metadata'
import { AuthRepository } from './auth.repository'
import { UserDto } from '../user/userDTO'
import * as crypto from 'crypto'
import config from '../../config'
import * as jwt from 'jsonwebtoken'
import { AuthClient } from './auth.client'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'

@injectable()
export class AuthService {
	// eslint-disable-next-line prettier/prettier
	constructor(
		@inject(TYPES.AuthClient) private authClient: AuthClient,
		@inject(TYPES.AuthRepo) private authRepository: AuthRepository,
	) {}

	public async verifyAccountToken(userDto: UserDto | undefined): Promise<boolean> {
		if (userDto) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			// const authClient = new OAuth2Client(config.CLIENT_ID)

			try {
				if (userDto.token !== undefined && userDto.token !== null) {
					const decodedUserDto = await this.authClient.verifyToken(userDto.token)

					if (decodedUserDto !== undefined && decodedUserDto.email === userDto.email) {
						return true
					}
				}
			} catch (error) {
				console.log(error)
			}
		}
		return false
	}

	public verifyPassword(hashPassword: string, password: string, secret: any = config.secret): boolean {
		const encrypted: string = crypto.createHmac('sha1', secret).update(password).digest('base64')
		console.log(encrypted)
		console.log(hashPassword)
		return hashPassword === encrypted
	}

	public generateToken(userDto: UserDto, secret: string): string {
		const token = jwt.sign(
			{
				//   _id: user._id,
				//   username: user.username,
				email: userDto.email,
				//   id: user.id,
				//   userType: user.userType
			},
			secret,
			{
				expiresIn: '7d',
				issuer: 'sws.com',
				subject: 'userInfo',
			},
		)

		return token
	}
}
