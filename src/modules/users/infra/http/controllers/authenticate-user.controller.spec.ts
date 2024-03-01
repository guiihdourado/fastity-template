import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { app } from '@shared/infra/http/app'
import { prisma } from '@shared/infra/database/prisma'

describe('Authenticate User (e2e)', () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`
  })

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const fieldsRequiredInResponse = ['token', 'user']
    const fieldsRequiredInUserResponse = ['name', 'email']

    const extraFieldsInResponse = Object.keys(response.body).filter(
      (field) => !fieldsRequiredInResponse.includes(field),
    )

    const extraFieldsInUserResponse = Object.keys(response.body.user).filter(
      (field) => !fieldsRequiredInUserResponse.includes(field),
    )

    expect(extraFieldsInResponse.length).toEqual(0)
    expect(Object.keys(response.body)).toEqual(fieldsRequiredInResponse)

    expect(extraFieldsInUserResponse.length).toEqual(0)
    expect(Object.keys(response.body.user)).toEqual(
      fieldsRequiredInUserResponse,
    )

    expect(response.statusCode).toEqual(200)
  })

  it('should not be able to authenticate user with email wrong', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe123@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(400)

    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toEqual('Email or password incorrect!')

    expect(response.body).toHaveProperty('status')
    expect(response.body.status).toEqual('error')
  })

  it('should not be able to authenticate user with password wrong', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '1234567',
    })

    expect(response.statusCode).toEqual(400)

    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toEqual('Email or password incorrect!')

    expect(response.body).toHaveProperty('status')
    expect(response.body.status).toEqual('error')
  })

  it('should not be able to authenticate user when email is not sending', async () => {
    const response = await request(app.server).post('/sessions').send({
      password: '123456',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error.')
  })

  it('should not be able to authenticate user when password is not sending', async () => {
    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error.')
  })
})
