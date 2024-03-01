import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { app } from '@shared/infra/http/app'
import { prisma } from '@shared/infra/database/prisma'

describe('Create User (e2e)', () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`
  })

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const fieldsRequiredInResponse = [
      'id',
      'name',
      'email',
      'password',
      'createdAt',
      'updatedAt',
    ]

    const extraFields = Object.keys(response.body).filter(
      (field) => !fieldsRequiredInResponse.includes(field),
    )

    expect(extraFields.length).toEqual(0)
    expect(Object.keys(response.body)).toEqual(fieldsRequiredInResponse)
    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create a new user with email from another', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(400)

    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toEqual('User already exists')

    expect(response.body).toHaveProperty('status')
    expect(response.body.status).toEqual('error')
  })

  it('should not be able to create a new user when name is not sending', async () => {
    const response = await request(app.server).post('/users').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error.')
  })

  it('should not be able to create a new user when email is not sending', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      password: '123456',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error.')
  })

  it('should not be able to create a new user when password is not sending', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error.')
  })
})
