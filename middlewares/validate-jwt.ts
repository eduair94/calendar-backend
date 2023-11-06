import { type Response, type NextFunction } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { type AuthRequest } from '../helpers'

export const validateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-token')
  if (token === undefined) {
    return res.status(401).json({
      ok: false,
      msg: 'Token not found'
    })
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED as string) as JwtPayload
    req.uid = uid
    req.name = name
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    })
  }
  next()
}
