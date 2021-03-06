const jwt = require('jsonwebtoken')
const logger = require('../config/logger')

const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          const msg = 'No se pudo generar el token'
          logger.error(msg)
          logger.error(err)
          reject(msg)
        }
        resolve(token)
      },
    )
  })
}

module.exports = {
  generarJWT,
}
