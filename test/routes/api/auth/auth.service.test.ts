import { AuthFakeClient } from '../../../../src/auth/auth.fake.client'
import { AuthRepository } from '../../../../src/auth/auth.repository'
import { AuthService } from '../../../../src/auth/auth.service'
import { UserDto } from '../../../../src/user/userDTO'
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'

function generateToken(email: string, secretKey: string): string {
	return jwt.sign(
		{
			//   _id: user._id,
			//   username: user.username,
			email: email,
			//   id: user.id,
			//   userType: user.userType
		},
		secretKey,
		{
			expiresIn: '7d',
			issuer: 'sws.com',
			subject: 'userInfo',
		},
	)
}

describe('사용자 토크 검증', () => {
	let authClient: AuthFakeClient
	let authRepository: AuthRepository
	let authSevice: AuthService
	const userDto = new UserDto('', 'test@naver.com', 'testtest')
	const secretKey = 'asdfasdf'

	beforeEach(() => {
		authClient = new AuthFakeClient(userDto)
		authRepository = new AuthRepository('test')
		authSevice = new AuthService(authClient, authRepository)
	})

	describe('사용자 토크 검증', () => {
		it('사용자 토큰 정보와 보내온 사용자 정보가 일치하면 true 리턴 ', async () => {
			const verifyMethod = jest.spyOn(authClient, 'verifyToken')
			const response = await authSevice.verifyAccountToken(userDto)
			expect(verifyMethod).toBeCalledTimes(1)
			expect(response).toBe(true)
		})

		it('사용자 토큰 정보와 보내온 사용자 정보가 다르면 false 리턴 ', async () => {
			const userDto2 = new UserDto('', 'test2@naver.com', 'testtest')
			const verifyMethod = jest.spyOn(authClient, 'verifyToken')
			const response = await authSevice.verifyAccountToken(userDto2)
			expect(verifyMethod).toBeCalledTimes(1)
			expect(response).toBe(false)
		})

		it('사용자 정보가 undefined면 false 리턴 ', async () => {
			const userDto2 = undefined
			const verifyMethod = jest.spyOn(authClient, 'verifyToken')
			const response = await authSevice.verifyAccountToken(userDto2)
			expect(verifyMethod).toBeCalledTimes(0)
			expect(response).toBe(false)
		})

		it('auth client throw를 던지면 false 리턴 ', async () => {
			const userDto2 = new UserDto('', 'test2@naver.com', 'testtest')
			authClient.verifyToken = jest.fn(token => {
				throw new Error('Throw error for test')
			})
			const verifyMethod = jest.spyOn(authClient, 'verifyToken')
			const response = await authSevice.verifyAccountToken(userDto2)
			expect(response).toBe(false)
		})
	})

	describe('사용자 패스워드 검증', () => {
		const password = 'testtest'
		it('사용자 패스워드와 패스워드 해쉬가 같으면 true 리턴 ', () => {
			const passwordHashBase64 = crypto.createHmac('sha1', secretKey).update(password).digest('base64')
			const response = authSevice.verifyPassword(passwordHashBase64, password, secretKey)
			expect(response).toBe(true)
		})

		it('사용자 패스워드와 패스워드 해쉬가 다르면 false 리턴 ', () => {
			const wrongPassword = 'testtest1'
			const passwordHashBase64 = crypto.createHmac('sha1', secretKey).update(password).digest('base64')
			const response = authSevice.verifyPassword(passwordHashBase64, wrongPassword, secretKey)
			expect(response).toBe(false)
		})

		it('사용자 패스워드와 패스워드 해쉬가 같아도 secret 다르면 false 리턴 ', () => {
			const passwordHashBase64 = crypto.createHmac('sha1', 'asdff').update(password).digest('base64')
			const response = authSevice.verifyPassword(passwordHashBase64, password, 'asddfasdf')
			expect(response).toBe(false)
		})
	})

	describe('토큰 생성 검증', () => {
		it('사용자 토큰과 생성된 토큰이 같으면 true 리턴 ', () => {
			const token = generateToken(userDto.email, secretKey)
			const response = authSevice.generateToken(userDto, secretKey)
			expect(response).toEqual(token)
		})

		it('사용자 토큰과 생성된 토큰이 다르면 true 리턴 ', () => {
			const wrongEmail = 'sws'
			const token = generateToken(wrongEmail, secretKey)
			const response = authSevice.generateToken(userDto, secretKey)
			expect(response).not.toEqual(token)
		})
	})
})
