import { CreateUserUseCase } from '@modules/users/application/use-cases/create-user'
import { UsersRepository } from '@modules/users/infra/database/prisma/repositories'
import { BCryptHashProvider } from '@shared/providers'

export const makeCreateUserUseCase = () => {
  const usersRepository = new UsersRepository()
  const hashProvider = new BCryptHashProvider()

  const createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider)

  return { createUserUseCase }
}
