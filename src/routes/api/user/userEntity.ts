import {UserDto} from './userDTO';

export class UserEntity {
	public token: string;
	public email: string;
	public password: string;
	constructor(token: string, email: string, password: string) {
		this.token = token;
		this.email = email;
		this.password = password;
	}

	// public toUserDto():UserDto
	// {
	//     return new UserDto(this.token, this.email, this.password)
	// }
}
