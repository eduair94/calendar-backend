import { type Request, type Response } from 'express'
import User from '../models/Usuario'
import bcrypt from 'bcryptjs'
import { type AuthRequest, generateJWT } from '../helpers'
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body
    let user = await User.findOne({ email })
    if (user !== null) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists'
      })
    }
    const userObj = { email, password, name }
    user = new User(userObj)
    // Encript password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)
    await user.save()
    const token = await generateJWT(user.id, user.name)
    res.status(201).json({
      ok: true,
      uid: user.id,
      name,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Talk to administration'
    })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user === null) {
      return res.status(400).json({
        ok: false,
        msg: 'User or/and password are not correct'
      })
    }
    // Check password.
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'User or/and password are not correct'
      })
    }
    const token = await generateJWT(user.id, user.name)
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Talk to administration'
    })
  }
}

export const renewToken = async (req: AuthRequest, res: Response) => {
  const uid = req.uid as string
  const name = req.name as string

  const token = await generateJWT(uid, name)

  res.json({
    uid,
    name,
    ok: true,
    token
  })
}

export const verifyAuth = (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: 'Token is valid'
  })
}
