import 'reflect-metadata'
import {Container} from 'inversify'
import {UserRepository} from '../src/routes/api/user/user.repository'
import {UserInMemoryRepositoryImpl} from '../src/routes/api/user/user.repository.in.memory.impl'
import {UserService} from '../src/routes/api/user/user.service'
import {TYPES} from '../src/types'

const myContainer = new Container()
myContainer.bind<UserRepository>(TYPES.UserRepo).to(UserInMemoryRepositoryImpl)
myContainer.bind<UserService>(TYPES.UserService).to(UserService)

export {myContainer}
