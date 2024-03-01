import { sign, verify } from 'jsonwebtoken'

import { IJwtProvider, Config, Payload, VerifyPayload } from '../jwt.provider'

class JsonWebTokenProvider implements IJwtProvider {
  generateToken(payload: Payload, config: Config): string {
    const token = sign(payload, config.secretToken, {
      subject: config.subject,
      expiresIn: config.expiresIn || '1d',
    })

    return token
  }

  verifyToken(token: string, secretToken: string): VerifyPayload {
    const response = verify(token, secretToken) as VerifyPayload

    return response
  }
}

export { JsonWebTokenProvider }
