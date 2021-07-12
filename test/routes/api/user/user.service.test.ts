import {UserService} from '../../../../src/routes/api/user/user.service';
import {UserDto} from '../../../../src/routes/api/user/userDTO';
import {UserRepository} from '../../../../src/routes/api/user/user.repository';
import {UserInMemoryRepositoryImpl} from '../../../../src/routes/api/user/user.repository.in.memory.impl';

describe('사용자 등록 시나리오 테스트', () => {
	let userService: UserService;
	let userRepository: UserRepository;

	beforeEach(() => {
		userRepository = new UserInMemoryRepositoryImpl();
		userService = new UserService(userRepository);
	});

	it('새로운 사용자 등록시 return true', () => {
		const userDto = new UserDto('', 'test@naver.com', 'testtest');
		const saveMethod = jest.spyOn(userRepository, 'save');
		const response = userService.registerUser(userDto);
		expect(saveMethod).toBeCalledTimes(1);
		expect(response).toBe(true);
	});

	it('존재하는 사용자 등록시 return false', () => {
		const userDto = new UserDto('', 'test@naver.com', 'testtest1');
		let response = userService.registerUser(userDto);

		const saveMethod = jest.spyOn(userRepository, 'save');
		response = userService.registerUser(userDto);
		expect(saveMethod).toBeCalledTimes(0);
		expect(response).toBe(false);
	});
});

describe('사용자 정보 검색 테스트', () => {
	let userService: UserService;
	let userRepository: UserRepository;

	beforeEach(() => {
		userRepository = new UserInMemoryRepositoryImpl();
		userService = new UserService(userRepository);
	});

	it('동일한 이메일로 등록된 사용자가 있으면 등록된 사용자 정보 리턴한다', () => {
		const userDto = new UserDto('', 'test@naver.com', 'testtest2');
		userService.registerUser(userDto);

		const getMethod = jest.spyOn(userRepository, 'get');

		const user = userService.findUser(userDto.email);
		expect(getMethod).toBeCalledTimes(1);
		expect(user).toHaveProperty('email', 'test@naver.com');
		expect(user).toHaveProperty('password', 'testtest2');
	});

	it('동일한 이메일로 등록된 사용자가 없으면 undefined를 리턴한다', () => {
		const userDto = new UserDto('', 'test@naver.com', 'testtest2');
		userService.registerUser(userDto);

		const getMethod = jest.spyOn(userRepository, 'get');

		const user = userService.findUser('testtest1');
		expect(getMethod).toBeCalledTimes(1);
		expect(user).toBeUndefined();
	});
});

describe('사용자 정보 삭제 테스트', () => {
	let userService: UserService;
	let userRepository: UserRepository;

	beforeEach(() => {
		userRepository = new UserInMemoryRepositoryImpl();
		userService = new UserService(userRepository);
	});

	it('유저 정보 삭제 요청시 사용자 정보가 있으면 정보를 삭제하고 true 리턴한다', () => {
		const userDto = new UserDto('', 'test@naver.com', 'testtest2');
		userService.registerUser(userDto);

		const deleteMethod = jest.spyOn(userRepository, 'delete');
		const response = userService.deleteUser(userDto.email);
		expect(deleteMethod).toBeCalledTimes(1);
		expect(response).toBe(true);

		const user = userService.findUser(userDto.email);
		expect(user).toBeUndefined();
	});

	it('유저 정보 삭제 요청시 사용자 정보가 없으면 false 리턴한다', () => {
		const userDto = new UserDto('', 'test@naver.com', 'testtest2');
		userService.registerUser(userDto);

		const deleteMethod = jest.spyOn(userRepository, 'delete');
		const response = userService.deleteUser('testtest1');
		expect(deleteMethod).toBeCalledTimes(0);
		expect(response).toBe(false);
	});
});

describe('사용자 정보 변경 테스트', () => {
	let userService: UserService;
	let userRepository: UserRepository;

	beforeEach(() => {
		userRepository = new UserInMemoryRepositoryImpl();
		userService = new UserService(userRepository);
	});

	it('유정 정보 변경 요청시 사용자 정보가 있으면 업데이트하고 true 리턴한다.', () => {
		const userDto = new UserDto('', 'test@naver.com', 'testtest1');
		userService.registerUser(userDto);

		const userDto2 = new UserDto('', 'test@naver.com', 'testtest2');

		const updateMethod = jest.spyOn(userRepository, 'update');
		const response = userService.changeUserInfo(userDto2);

		expect(response).toBe(true);

		const user = userService.findUser(userDto.email);

		expect(updateMethod).toBeCalledTimes(1);
		expect(user).toHaveProperty('email', 'test@naver.com');
		
		expect(user).toHaveProperty('password', 'testtest2');
	});

	it('유정 정보 변경 요청시 사용자 정보 없으면 false 리턴한다.', () => {
		const userDto2 = new UserDto('', 'test@naver.com', 'testtest2');

		const updateMethod = jest.spyOn(userRepository, 'update');
		const response = userService.changeUserInfo(userDto2);

		expect(response).toBe(false);

		const user = userService.findUser(userDto2.email);

		expect(updateMethod).toBeCalledTimes(0);
		expect(user).toBeUndefined();
	});
});
