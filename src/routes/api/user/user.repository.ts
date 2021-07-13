import {UserDto} from './userDTO';

export interface UserRepository {
	save(userDto: UserDto): void;

	delete(userId: string): void;

	update(userDTO: UserDto): void;

	get(userId: string): UserDto | undefined;
}
