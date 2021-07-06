import {UserDto} from '../user/userDTO';
import {AuthClient} from './auth.client';

export class AuthGoogleClient implements AuthClient {
  verifyToken(token: string): UserDto | undefined {
    throw new Error('Method not implemented.');
  }
}
