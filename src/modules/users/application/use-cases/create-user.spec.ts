import { expect, describe, beforeEach, it, vi } from 'vitest'

import { MockHashProvider } from '@shared/providers'
import { UsersRepository } from '@modules/users/infra/database/in-memory/repositories'

import { CreateUserUseCase } from './create-user'

import { AppError } from '@shared/application/errors/app-error'

let usersRepository: UsersRepository
let mockHashProvider: MockHashProvider

let sut: CreateUserUseCase

describe('Create Company', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository()
    mockHashProvider = new MockHashProvider()

    sut = new CreateUserUseCase(usersRepository, mockHashProvider)
  })

  it('should be able a create a new user', async () => {
    const hashSpy = vi.spyOn(mockHashProvider, 'generateHash')

    const user = await sut.execute({
      email: 'johndoe@mail.com',
      name: 'John Doe',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
    expect(hashSpy).toHaveBeenCalledWith('123456')
    expect(hashSpy).toHaveBeenCalledTimes(1)
  })

  it('should not be able to create a new user with email from another', async () => {
    await sut.execute({
      email: 'johndoe@mail.com',
      name: 'John Doe',
      password: '123456',
    })

    await expect(
      sut.execute({
        email: 'johndoe@mail.com',
        name: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
