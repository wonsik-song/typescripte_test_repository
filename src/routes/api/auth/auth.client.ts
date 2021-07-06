import {UserDto} from '../user/userDTO';

export interface AuthClient {
  verifyToken(token: string): UserDto | undefined;
}
