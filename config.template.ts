// please rename this file to config.js
import * as path from 'path'
const dataPath = path.join(__dirname, 'data')

const config = {
	secret: 'asdfasdfasdf',
	storageUri: 'asdfasdfadsfasdf',
	dataPath: dataPath,
	mongodbUri: 'mongodb://localhost:27017/admin',
	CLIENT_ID: 'asdfasdf.com',
	port: 8080,
}

export default config
