import { FastifyInstance } from 'fastify'

import { usersRoutes } from './users.routes'
import { authenticateRoutes } from './authenticate.routes'

export const routes = async (app: FastifyInstance) => {
  app.register(usersRoutes, {
    prefix: '/users',
  })

  app.register(authenticateRoutes)
}
