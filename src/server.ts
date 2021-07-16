import App from './app'
import { myContainer } from './inversify.config'
import { TYPES } from './types'
import Controller from './interfaces/controller.interface'

const controller = myContainer.getAll<Controller>(TYPES.Controller)

const server = new App(controller)

server.listen()

export default server
