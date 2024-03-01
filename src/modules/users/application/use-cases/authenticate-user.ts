import { IAuthenticateUserDTO } from '@modules/users/application/dtos'
import { IUsersRepository } from '@modules/users/application/repositories'
import { IAuthenticateUserUseCaseResponse } from '@modules/users/application/types'

import { IHashProvider, IJsonTokenProvider } from '@shared/providers'

import { AppError } from '@shared/application/errors'
import { SingleResponse } from '@shared/application/types'

import auth from '@config/auth'

class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
    private jsonTokenProvider: IJsonTokenProvider,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<
    SingleResponse<IAuthenticateUserUseCaseResponse>
  > {
    const user = await this.usersRepository.findByEmail(email)

    const { expiresInToken, secretToken } = auth

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const token = this.jsonTokenProvider.generateToken(
      {
        email: user.email,
      },
      {
        secretToken,
        subject: user.id,
        expiresIn: expiresInToken,
      },
    )

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    }
  }
}

export { AuthenticateUserUseCase }
