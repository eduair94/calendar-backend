import { type Request } from 'express'
export interface AuthRequest extends Request {
  uid?: string
  name?: string
}
