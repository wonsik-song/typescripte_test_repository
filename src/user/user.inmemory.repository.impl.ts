import 'reflect-metadata'
import { injectable } from 'inversify'
import UserDataMapper from './user.data.mapper'
import { UserDto } from './userDTO'
import { UserEntity } from './userEntity'
import { Repository } from '../interfaces/repository.interface'

@injectable()
export class UserInMemoryRepositoryImpl implements Repository<UserDto, string> {
	private userEntityList: Map<string, UserEntity>
	private mapper: UserDataMapper

	constructor() {
		this.userEntityList = new Map<string, UserEntity>()
		this.mapper = new UserDataMapper()
	}
	public save(userDto: UserDto) {
		this.userEntityList.set(userDto.email, this.mapper.toMapEntity(userDto))
	}

	public delete(userId: string) {
		this.userEntityList.delete(userId)
	}

	public update(userDTO: UserDto) {
		this.save(userDTO)
	}

	public get(userId: string): UserDto | undefined {
		const userEntity = this.userEntityList.get(userId)

		if (userEntity) return this.mapper.toMapDto(userEntity)
		else return undefined
	}
}
