'use strict'

const Mail = use('Mail')

class ShareEventMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'ShareEventMail-job'
  }

  async handle ({ email, name, event }) {
    await Mail.send(['emails.share_event'], { name, event }, message => {
      message
        .to(email)
        .from('lucascruzati@gmail.com', 'Desafio4')
        .subject(`Evento: ${event.name}`)
    })
  }
}

module.exports = ShareEventMail
