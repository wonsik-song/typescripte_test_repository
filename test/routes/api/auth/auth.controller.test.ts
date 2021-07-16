import { AuthController } from '../../../../src/auth/auth.controller'
import { AuthFakeClient } from '../../../../src/auth/auth.fake.client'
import { AuthRepository } from '../../../../src/auth/auth.repository'
import { AuthService } from '../../../../src/auth/auth.service'
import { UserInMemoryRepositoryImpl } from '../../../../src/user/user.inmemory.repository.impl'
import { UserService } from '../../../../src/user/user.service'
import { UserDto } from '../../../../src/user/userDTO'
import { getMockReq, getMockRes } from '@jest-mock/express'
import UserInfoUndefinedInfoException from '../../../../src/exceptions/user.info.undefined.exception'
import UserEmailExistsException from '../../../../src/exceptions/user.mail.exist.exception'
import { Repository } from '../../../../src/interfaces/repository.interface'
import UnknownInternalException from '../../../../src/exceptions/unknown.internal.exception'

describe('사용자 인증 테스트', () => {
	let authClient: AuthFakeClient
	let authRepository: AuthRepository
	let authSevice: AuthService
	let userService: UserService
	let userRepository: Repository<UserDto, string>

	let authController: AuthController

	const userDto = new UserDto('', 'test@naver.com', 'testtest')
	const { res, next } = getMockRes()

	beforeEach(() => {
		authClient = new AuthFakeClient(userDto)
		authRepository = new AuthRepository('test')
		authSevice = new AuthService(authClient, authRepository)
		userRepository = new UserInMemoryRepositoryImpl()
		userService = new UserService(userRepository)
		authController = new AuthController(userService, authSevice)
		jest.clearAllMocks()
	})

	describe('사용자 등록 파라메테 유효성 테스트', () => {
		it('등록시 email 가 null 이면 UserInfoUndefinedInfoException 리턴한다. ', () => {
			const req = getMockReq({
				body: { email: null, password: 'tset' },
			})
			authController.register(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
			expect(next).toHaveBeenCalledWith(new UserInfoUndefinedInfoException())
		})

		it('등록시 password 가 null 이면 UserInfoUndefinedInfoException 리턴한다. ', () => {
			const req = getMockReq({
				body: { email: 'asdfadsf', password: null },
			})
			authController.register(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
			expect(next).toHaveBeenCalledWith(new UserInfoUndefinedInfoException())
		})

		it('등록시 email과 password 가 모두 null 이면 UserInfoUndefinedInfoException 리턴한다. ', async () => {
			const req = getMockReq({
				body: { email: null, password: null },
			})
			authController.register(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
			expect(next).toHaveBeenCalledWith(new UserInfoUndefinedInfoException())
		})
	})

	describe('사용자 등록 테스트', () => {
		it('등록 되지 않은 이메일로 등록을 요청하면 user_registered 리턴한다.', async () => {
			const req = getMockReq({
				body: { email: 'asdfasdfdas', password: 'asdfasdf' },
			})
			authController.register(req, res, next)
			expect(next).toHaveBeenCalledTimes(0)
			expect(res.json).toHaveBeenCalledTimes(1)
			expect(res.json).toHaveBeenCalledWith({
				message: 'registered successfully',
				email: 'asdfasdfdas',
			})
		})

		it('사용자가 이미 등록 되어 있으면 UserWithThatEmailAlreadyExistsException 리턴한다.', async () => {
			const req = getMockReq({
				body: { email: 'asdfasdfdas', password: 'asdfasdf' },
			})
			authController.register(req, res, next)
			expect(next).toHaveBeenCalledTimes(0)
			expect(res.json).toHaveBeenCalledTimes(1)
			expect(res.json).toHaveBeenCalledWith({
				message: 'registered successfully',
				email: 'asdfasdfdas',
			})

			authController.register(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
			expect(next).toHaveBeenCalledWith(new UserEmailExistsException('asdfasdfdas'))
		})
	})

	describe('내부 exception 테스트', () => {
		it('내부 exception이 발생하면 InternalException 발생한다.', () => {
			const req = getMockReq({
				body: { email: 'asdfasdfdas', password: 'asdfasdf' },
			})
			userService.findUser = jest.fn(id => {
				throw new Error('internal exception')
			})
			authController.register(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
			expect(next).toHaveBeenCalledWith(new UnknownInternalException())
		})
	})
})
