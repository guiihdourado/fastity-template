import { expect, describe, beforeEach, it, vi } from 'vitest'

import { MockHashProvider, MockJsonWebToken } from '@shared/providers'
import { UsersRepository } from '@modules/users/infra/database/in-memory/repositories'

import { AuthenticateUserUseCase } from './authenticate-user'

import { AppError } from '@shared/application/errors'

let usersRepository: UsersRepository
let mockHashProvider: MockHashProvider
let mockJsonWebTokenProvider: MockJsonWebToken

let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository()
    mockHashProvider = new MockHashProvider()
    mockJsonWebTokenProvider = new MockJsonWebToken()

    sut = new AuthenticateUserUseCase(
      usersRepository,
      mockHashProvider,
      mockJsonWebTokenProvider,
    )
  })

  it('should be able to authenticate user', async () => {
    const hashSpy = vi.spyOn(mockHashProvider, 'compareHash')
    const generateTokenSpy = vi.spyOn(mockJsonWebTokenProvider, 'generateToken')
    const verifyTokenSpy = vi.spyOn(mockJsonWebTokenProvider, 'verifyToken')

    await usersRepository.create({
      email: 'johndoe@mail.com',
      name: 'John Doe',
      password: '123456',
    })

    const tokenData = await sut.execute({
      email: 'johndoe@mail.com',
      password: '123456',
    })

    expect(tokenData).toHaveProperty('token')
    expect(tokenData.user.name).toBe('John Doe')
    expect(tokenData.user.email).toBe('johndoe@mail.com')

    expect(hashSpy).toHaveBeenCalledTimes(1)
    expect(hashSpy).toHaveBeenCalledWith('123456', '123456')

    expect(generateTokenSpy).toHaveBeenCalledTimes(1)
    expect(verifyTokenSpy).toHaveBeenCalledTimes(0)
  })

  it('should not be able to authenticate user with email wrong', async () => {
    await usersRepository.create({
      email: 'wrong@email.com',
      name: 'John Doe',
      password: '123456',
    })

    await expect(
      sut.execute({
        email: 'johndoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate user with password wrong', async () => {
    await usersRepository.create({
      email: 'johndoe@mail.com',
      name: 'John Doe',
      password: '111111',
    })

    await expect(
      sut.execute({
        email: 'johndoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate user when user not exists', async () => {
    await expect(
      sut.execute({
        email: 'johndoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
