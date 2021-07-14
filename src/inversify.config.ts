import 'reflect-metadata'
import {Container, interfaces} from 'inversify'
import {TYPES} from './types'
import {UserRepository} from './routes/api/user/user.repository'
import {UserInMemoryRepositoryImpl} from './routes/api/user/user.repository.in.memory.impl'
import {AuthService} from './routes/api/auth/auth.service'
import {AuthRepository} from './routes/api/auth/auth.repository'
import {AuthClient} from './routes/api/auth/auth.client'
import {AuthGoogleClient} from './routes/api/auth/auth.google.client'
import {UserService} from './routes/api/user/user.service'
import {AuthController} from './routes/api/auth/auth.controller1'

const myContainer = new Container()
myContainer.bind<UserRepository>(TYPES.UserRepo).to(UserInMemoryRepositoryImpl)
myContainer.bind<AuthRepository>(TYPES.AuthRepo).toDynamicValue((context: interfaces.Context) => {
	return new AuthRepository('test')
})
myContainer.bind<AuthClient>(TYPES.AuthClient).to(AuthGoogleClient)
myContainer.bind<AuthService>(TYPES.AuthService).to(AuthService)
myContainer.bind<UserService>(TYPES.UserService).to(UserService)
myContainer.bind<AuthController>(TYPES.AuthController).to(AuthController)

export {myContainer}
