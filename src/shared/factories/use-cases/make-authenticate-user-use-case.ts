import { AuthenticateUserUseCase } from '@modules/users/application/use-cases/authenticate-user'
import { UsersRepository } from '@modules/users/infra/database/prisma/repositories'
import { BCryptHashProvider, JsonWebTokenProvider } from '@shared/providers'

export const makeAuthenticateUserUseCase = () => {
  const usersRepository = new UsersRepository()
  const hashProvider = new BCryptHashProvider()
  const jwtProvider = new JsonWebTokenProvider()

  const authenticateUser = new AuthenticateUserUseCase(
    usersRepository,
    hashProvider,
    jwtProvider,
  )

  return { authenticateUser }
}
