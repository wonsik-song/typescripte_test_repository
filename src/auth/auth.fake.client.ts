import { UserDto } from '../user/userDTO'
import { AuthClient } from './auth.client'

export class AuthFakeClient implements AuthClient {
	constructor(private userDto: UserDto) {}

	verifyToken(token: string): UserDto | undefined {
		return new UserDto(this.userDto.token, this.userDto.email, this.userDto.password)
	}
}
