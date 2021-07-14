import * as express from 'express'
import {UserRepository} from '../user/user.repository'
import {UserInMemoryRepositoryImpl} from '../user/user.repository.in.memory.impl'
import {UserService} from '../user/user.service'
import {AuthController} from './auth.controller1'
import {AuthGoogleClient} from './auth.google.client'
import {AuthRepository} from './auth.repository'
import {AuthService} from './auth.service'

import {myContainer} from '../../../inversify.config'
import {TYPES} from '../../../types'
// const authMiddleware = require('../../../middlewares/auth')
const authRouter = express.Router()
// const authRepository = new AuthRepository('dao');
// const userRepository = new UserInMemoryRepositoryImpl();
// const userService = new UserService(userRepository);
// const authGoogleClient = new AuthGoogleClient();
// const authService = new AuthService(authRepository, authGoogleClient);
// const controller = new AuthController(authService, userService);

const authController = myContainer.get<AuthController>(TYPES.AuthController)
authRouter.post('/register', authController.register)

// authRouter.post('/login', controller.login)

// // authRouter.use('/check', authMiddleware)
// authRouter.get('/check', controller.check)

// // authRouter.use('/delete', authMiddleware)
// authRouter.get('/delete', controller.delete)

// // authRouter.use('/update', authMiddleware)
// authRouter.post('/update', controller.update)

// authRouter.get('/checkToken', controller.checkToken)

module.exports = authRouter
