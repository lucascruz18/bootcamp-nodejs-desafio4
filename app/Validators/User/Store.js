'use strict'

class Store {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }
}

module.exports = Store
