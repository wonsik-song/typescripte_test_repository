// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {UserEntity} from './userEntity';

export class UserDto {
	public token: string;
	public email: string;
	public password: string;
	constructor(token: string, email: string, password: string) {
		this.token = token;
		this.email = email;
		this.password = password;
	}

	// public toUserEntity():UserEntity
	// {
	//     return new UserEntity(this.token, this.email, this.password)
	// }
}
