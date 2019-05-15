'use strict'

const Route = use('Route')

/**
USERS
***/
Route.post('users', 'UserController.store').validator('User/Store')
Route.put('users/:id', 'UserController.update').middleware('auth')

/**
SESSION
***/
Route.post('sessions', 'SessionController.store').validator('Session')
Route.post('forgotpasswords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('forgotpasswords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

/**
EVENTS
***/
Route.post('event', 'EventController.store')
  .middleware('auth')
  .validator('Event/Store')

Route.get('events', 'EventController.index').middleware('auth')

Route.put('event/:id', 'EventController.update')
  .middleware('auth')
  .validator('Event/Update')

Route.delete('event/:event_id', 'EventController.destroy').middleware('auth')

Route.post('events/:event_id/share', 'ShareEventController.share')
  .middleware('auth')
  .validator('Event/share')
