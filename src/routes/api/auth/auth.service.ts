import {AuthRepository} from './auth.repository';
import {UserDto} from '../user/userDTO';
import {OAuth2Client, TokenPayload} from 'google-auth-library';
import crypto = require('crypto');
const config = require('../../../../config');
const jwt = require('jsonwebtoken');
import {AuthClient} from './auth.client';

export class AuthService {
	constructor(private authRepository: AuthRepository, private authClient: AuthClient) {}

	public async verifyAccountToken(userDto: UserDto): Promise<boolean> {
		if (userDto) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const authClient = new OAuth2Client(config.CLIENT_ID);

			try {
				const decodedUserDto = await this.authClient.verifyToken(userDto.token);

				if (decodedUserDto !== undefined && decodedUserDto.email === userDto.email) {
					return true;
				}
			} catch (error) {
				console.log(error);
			}

			return false;
		}
		return true;
	}

	public verifyPassword(hashPassword: string, password: string): boolean {
		const encrypted = crypto.createHmac('sha1', config.secret).update(password).digest('base64');
		console.log(hashPassword === encrypted);

		return hashPassword === encrypted;
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
		);

		return token;
	}
}
