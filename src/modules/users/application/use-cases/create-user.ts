import { User } from '@modules/users/application/entities'

import { ICreateUserDTO } from '@modules/users/application/dtos'
import { IUsersRepository } from '@modules/users/application/repositories'

import { IHashProvider } from '@shared/providers'

import { AppError } from '@shared/application/errors'
import { SingleResponse } from '@shared/application/types'

class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<SingleResponse<User>> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const hashPassword = await this.hashProvider.generateHash(password)

    const payloadUser = {
      email,
      name,
      password: hashPassword,
    }

    const user = await this.usersRepository.create(payloadUser)

    return user
  }
}

export { CreateUserUseCase }
