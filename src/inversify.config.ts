import 'reflect-metadata'
import { Container, interfaces } from 'inversify'
import { TYPES } from './types'
import { UserInMemoryRepositoryImpl } from './user/user.inmemory.repository.impl'
import { AuthService } from './auth/auth.service'
import { AuthRepository } from './auth/auth.repository'
import { AuthClient } from './auth/auth.client'
import { AuthGoogleClient } from './auth/auth.google.client'
import { UserService } from './user/user.service'
import { AuthController } from './auth/auth.controller'
import { Repository } from './interfaces/repository.interface'
import { UserDto } from './user/userDTO'
import Controller from './interfaces/controller.interface'

const myContainer = new Container()
myContainer.bind<Repository<UserDto, string>>(TYPES.UserRepo).to(UserInMemoryRepositoryImpl)
myContainer.bind<AuthRepository>(TYPES.AuthRepo).toDynamicValue((context: interfaces.Context) => {
	return new AuthRepository('test')
})
myContainer.bind<AuthClient>(TYPES.AuthClient).to(AuthGoogleClient)
myContainer.bind<AuthService>(TYPES.AuthService).to(AuthService)
myContainer.bind<UserService>(TYPES.UserService).to(UserService)
myContainer.bind<Controller>(TYPES.Controller).to(AuthController)

export { myContainer }
