'use strict'

const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('lucascruzati@gmail.com', 'Lucas | Desafio4')
            .subject('Recuperação de Senha')
        }
      )
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo deu errado, seu email está correto?' }
      })
    }
  }

  async update ({ request, response }) {
    try {
      const data = request.only(['token', 'password', 'password_confirmation'])

      const user = await User.findByOrFail('token', data.token)

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response.status(401).send({
          error: { message: 'O token de recuperação está expirado.' }
        })
      }

      user.token = null
      user.token_created_at = null
      user.password = data.password

      if (data.password_confirmation === data.password) {
        delete data.confirm_password
        await user.save()
      }
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Algo deu errado, o token é válido?' } })
    }
  }
}

module.exports = ForgotPasswordController
