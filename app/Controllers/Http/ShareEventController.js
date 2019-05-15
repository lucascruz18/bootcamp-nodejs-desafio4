'use strict'

const Event = use('App/Models/Event')
const Kue = use('Kue')
const Job = use('App/Jobs/ShareEventMail')

class ShareEventController {
  async share ({ request, response, params, auth }) {
    const event = await Event.findOrFail(params.event_id)
    const email = request.input('email')

    if (event.id_user !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Apenas o criador do evento pode compartilha-lo.'
        }
      })
    }

    Kue.dispatch(
      Job.key,
      { email, name: auth.user.name, event },
      { attempts: 3 }
    )

    return email
  }
}

module.exports = ShareEventController
