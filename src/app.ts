import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as mongoose from 'mongoose'
import * as morgan from 'morgan'

import config from '../config'
import Controller from './interfaces/controller.interface'
import errorMiddleware from './middleware/error.middleware'

class App {
	public app: express.Application

	constructor(controllers: Controller[]) {
		this.app = express()

		this.connectToTheDatabase()
		this.initializeMiddlewares()
		this.initializeControllers(controllers)
		this.initializeErrorHandling()
	}

	public listen() {
		this.app.listen(config.port, () => {
			console.log(`App listening on the port ${process.env.PORT}`)
		})
	}

	public getServer() {
		return this.app
	}

	private initializeMiddlewares() {
		// tslint:disable-next-line:only-arrow-functions
		this.app.all('/*', function (req: express.Request, res: express.Response, next: express.NextFunction) {
			res.header('Access-Control-Allow-Origin', '*')
			res.header('Access-Control-Allow-Headers', 'X-Requested-With')
			next()
		})

		this.app.use(bodyParser.urlencoded({ extended: false }))
		this.app.use(bodyParser.json())

		this.app.use(morgan('dev'))

		// set the secret key variable for jwt
		this.app.set('jwt-secret', config.secret)
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware)
	}

	private initializeControllers(controllers: Controller[]) {
		controllers.forEach(controller => {
			this.app.use('/api', controller.router)
		})
	}

	private connectToTheDatabase() {
		const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env
		// mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`)
	}
}

export default App
