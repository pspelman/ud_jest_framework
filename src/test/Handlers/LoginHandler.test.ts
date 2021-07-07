import {LoginHandler} from "../../app/Handlers/LoginHandler";
import {HTTP_CODES, HTTP_METHODS, SessionToken} from "../../app/Models/ServerModels";
import clearAllMocks = jest.clearAllMocks;
import {Utils} from "../../app/Utils/Utils";

describe('LoginHandler tests', () => {
	let loginHandler: LoginHandler;
	const requestMock = {
		method: ''
	}
	const responseMock = {
		writeHead: jest.fn(),
		write: jest.fn(),
		statusCode: 0
	}
	const authorizerMock = {
		generateToken: jest.fn()
	}
	const getRequestBodyMock = jest.fn()

	const someSessionToken: SessionToken = {
		tokenId: 'someTokenId',
		userName: 'someUserName',
		valid: true,
		expirationTime: new Date(),
		accessRights: [1, 2, 3]
	}

	beforeEach(() => {
		loginHandler = new LoginHandler(
			requestMock as any,
			responseMock as any,
			authorizerMock as any
		)
		Utils.getRequestBody = getRequestBodyMock
	});

	afterEach(() => {
		clearAllMocks()
	})

	test('options request', async () => {
		requestMock.method = HTTP_METHODS.OPTIONS;
		await loginHandler.handleRequest();
		expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.OK);
	})

	test('not handled http method', async () => {
		requestMock.method = 'someRandomMethod'
		await loginHandler.handleRequest();
		expect(responseMock.writeHead).not.toHaveBeenCalled();
	})

	test('post request with valid login', async () => {
		requestMock.method = HTTP_METHODS.POST
		authorizerMock.generateToken.mockReturnValueOnce(someSessionToken)
		getRequestBodyMock.mockReturnValueOnce({
			username: 'someUser',
			password: 'pass'
		})
		await loginHandler.handleRequest();
		// check for the status code
		expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED)
		// check the writeHead was called with the correct http code and content type
		expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.CREATED, {'Content-Type': 'application/json'})
		// check the write method was called with the correct token
		expect(responseMock.write).toBeCalledWith(JSON.stringify(someSessionToken));
	})

})
