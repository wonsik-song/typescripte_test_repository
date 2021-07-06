export class AuthRepository {
  constructor(mongoDbDao: string) {}
  createUser(user: string): void {}
  findUser(email: string): void {}

  deleteUser(email: string): void {}

  updateUser(email: string): void {}
}
