import {UserDto} from './userDTO';
import {UserRepository} from './user.repository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  public registerUser(userDto: UserDto): boolean {
    if (this.isUserExist(userDto)) return false;

    this.userRepository.save(userDto);
    return true;
  }

  private isUserExist(userDto: UserDto): boolean {
    if (this.userRepository.get(userDto.email)) return true;
    else return false;
  }

  public findUser(userId: string): UserDto | undefined {
    return this.userRepository.get(userId);
  }

  public deleteUser(userId: string): boolean {
    if (this.userRepository.get(userId)!) {
      this.userRepository.delete(userId);
      return true;
    }

    return false;
  }

  public changeUserInfo(userDto: UserDto): boolean {
    if (this.userRepository.get(userDto.email)) {
      this.userRepository.update(userDto);
      return true;
    }

    return false;
  }
}
