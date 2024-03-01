import { IJwtProvider, Config, Payload, VerifyPayload } from '../jwt.provider'

class MockJsonWebToken implements IJwtProvider {
  generateToken(_: Payload, __: Config): string {
    const token = 'cfe275a5908b5650488e0b0342c2d6cc'

    return token
  }

  verifyToken(_: string, __: string): VerifyPayload {
    const response = {
      exp: 1633638400,
      sub: '1',
    } as VerifyPayload

    return response
  }
}

export { MockJsonWebToken }
