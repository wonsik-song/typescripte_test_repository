import { injectable } from 'inversify'
import 'reflect-metadata'
import { Repository } from '../interfaces/repository.interface'

/* eslint-disable @typescript-eslint/no-empty-function */
@injectable()
export class AuthRepository implements Repository<string, string> {
	constructor(mongoDbDao: string) {}
	save(userDto: string): void {
		throw new Error('Method not implemented.')
	}
	delete(userId: string): void {
		throw new Error('Method not implemented.')
	}
	update(userDTO: string): void {
		throw new Error('Method not implemented.')
	}
	get(userId: string): string | undefined {
		throw new Error('Method not implemented.')
	}
}
