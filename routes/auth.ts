import { type RequestHandler, Router } from 'express'
import { createUser, loginUser, renewToken, verifyAuth } from '../controllers/auth'
import { check } from 'express-validator'
import { checkFields, validateJWT } from '../middlewares'

const router = Router()

router.post('/new', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  checkFields
], createUser as RequestHandler)
router.post('/', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  checkFields
], loginUser as RequestHandler)
router.get('/renew', [validateJWT], renewToken as RequestHandler)
router.get('/', verifyAuth)

export default router
