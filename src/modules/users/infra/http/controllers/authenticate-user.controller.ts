import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeAuthenticateUserUseCase } from '@shared/factories/use-cases/make-authenticate-user-use-case'

class AuthenticateUserController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Response> {
    const authenticateUserBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateUserBodySchema.parse(request.body)

    const { authenticateUser } = makeAuthenticateUserUseCase()

    const authenticatedUser = await authenticateUser.execute({
      email,
      password,
    })

    return reply.status(200).send(authenticatedUser)
  }
}

export { AuthenticateUserController }
