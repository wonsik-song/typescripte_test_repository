import {injectable} from 'inversify'

/* eslint-disable @typescript-eslint/no-empty-function */
@injectable()
export class AuthRepository {
	constructor(mongoDbDao: string) {}
	createUser(user: string): void {}
	findUser(email: string): void {}
	deleteUser(email: string): void {}
	updateUser(email: string): void {}
}
