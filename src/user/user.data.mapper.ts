import { UserDto } from './userDTO'
import { UserEntity } from './userEntity'

class UserDataMapper {
	public toMapDto(userEntity: UserEntity): UserDto {
		return new UserDto(userEntity.token, userEntity.email, userEntity.password)
	}

	public toMapEntity(userDto: UserDto): UserEntity {
		return new UserEntity(userDto.token, userDto.email, userDto.password)
	}
}

export default UserDataMapper
