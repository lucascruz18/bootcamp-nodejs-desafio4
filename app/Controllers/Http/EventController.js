'use strict'

const Event = use('App/Models/Event')
const moment = require('moment')

class EventController {
  async store ({ request, response, auth }) {
    const { name, location, when } = request.all()

    try {
      await Event.findByOrFail('when', when)

      return response.status(401).send({
        error: {
          message: 'Não é possível definir dois eventos no mesmo horário.'
        }
      })
    } catch (error) {
      const event = await Event.create({
        id_user: auth.user.id,
        name,
        location,
        when
      })

      await event.save()

      return event
    }
  }

  async index ({ request, auth }) {
    const { page } = request.get()
    const { date } = request.only(['date'])

    let event = Event.query().where('id_user', auth.user.id)

    if (date) {
      event = Event.query().where('when', date)
    }

    const events = await event.paginate(page)
    return events
  }

  async update ({ request, response, auth }) {
    const event = await Event.findOrFail(request.params.event_id)

    if (event.id_user !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Apenas o criador do evento pode edita-lo.'
        }
      })
    }

    const passed = moment().isAfter(event.when)

    if (passed) {
      return response.status(401).send({
        error: {
          message: 'Você não pode editar eventos passados.'
        }
      })
    }

    const data = request.only(['name', 'where', 'when'])

    try {
      const event = await Event.findByOrFail('when', data.when)
      if (event.id !== Number(request.params.event_id)) {
        return response.status(401).send({
          error: {
            message: 'Não é possível definir dois eventos no mesmo horário.'
          }
        })
      }
    } catch (err) {}

    event.merge(data)

    await event.save()

    return event
  }

  async destroy ({ params, response, auth }) {
    const event = await Event.findOrFail(params.event_id)

    if (event.id_user !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Apenas o criador do evento pode excluí-lo.'
        }
      })
    }

    const passed = moment().isAfter(event.when)

    if (passed) {
      return response.status(401).send({
        error: {
          message: 'Você não pode excluir eventos passados.'
        }
      })
    }

    await event.delete()
  }
}

module.exports = EventController
