import jwt from 'jsonwebtoken'

export const generateJWT = async (uid: string, name: string) => {
  const payload = { uid, name }
  return await new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_JWT_SEED as string, {
      expiresIn: '2h'
    }, (err, token) => {
      if (err !== null) {
        console.log(err)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Not possible to generate token')
      } else {
        resolve(token)
      }
    })
  })
}
