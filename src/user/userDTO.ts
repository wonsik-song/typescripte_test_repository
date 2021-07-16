// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserEntity } from './userEntity'

export class UserDto {
	public token: string | null | undefined
	public email: string
	public password: string
	constructor(token: string | null | undefined, email: string, password: string) {
		this.token = token
		this.email = email
		this.password = password
	}

	public isInfoValidation(): boolean {
		if (this.email === null || this.email === undefined || this.password === null || this.password === undefined) {
			return false
		}
		return true
	}

	// public toUserEntity():UserEntity
	// {
	//     return new UserEntity(this.token, this.email, this.password)
	// }
}
