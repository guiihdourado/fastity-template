import fastify from 'fastify'

import { routes } from './routes'
import { ZodError } from 'zod'
import { AppError } from '@shared/application/errors'
import { env } from '../env'

export const app = fastify()

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message,
    })
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply
    .status(500)
    .send({ status: 'error', message: 'Internal server error.' })
})
