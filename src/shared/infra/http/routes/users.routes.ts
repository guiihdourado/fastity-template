import { CreateUserController } from '@modules/users/infra/http/controllers/create-user.controller'
import { FastifyInstance } from 'fastify'

const createUserController = new CreateUserController()

const usersRoutes = async (app: FastifyInstance) => {
  app.post('/', createUserController.handle)
}

export { usersRoutes }
