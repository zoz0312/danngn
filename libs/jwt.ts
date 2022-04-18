import * as jwt from 'jsonwebtoken'

export const jwtSign = (payload: object): string => {
  return jwt.sign(payload, process.env.PRIVATE_KEY)
}

export const jwtVerify = (token: string): object => {
  return jwt.verify(token, process.env.PRIVATE_KEY)
}
