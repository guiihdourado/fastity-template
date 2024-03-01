import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateUserUseCase } from '@shared/factories/use-cases/make-create-user-use-case'

class CreateUserController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)

    const { createUserUseCase } = makeCreateUserUseCase()

    const user = await createUserUseCase.execute({
      email,
      name,
      password,
    })

    return reply.status(201).send(user)
  }
}

export { CreateUserController }
