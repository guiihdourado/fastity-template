import { FastifyInstance } from 'fastify'

import { AuthenticateUserController } from '@modules/users/infra/http/controllers/authenticate-user.controller'

const authenticateUserController = new AuthenticateUserController()

const authenticateRoutes = async (app: FastifyInstance) => {
  app.post('/sessions', authenticateUserController.handle)
}

export { authenticateRoutes }
