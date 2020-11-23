
export function register ({ commit }, payload) {
  return this._vm.$axios.post('register', payload).then((response) => {
    if (response.data.type === 'success') {
      this._vm.$q.notify({
        color: 'positive',
        textColor: 'grey-9',
        icon: 'send',
        message: response.data.message
      })
      commit('setBusiness', response.data.payload)
      commit('setTemplate', payload.db_name)
      return response.data.payload
    } else {
      this._vm.$q.notify({
        color: 'warning',
        textColor: 'grey-9',
        icon: 'error',
        message: response.data.message
      })
    }
  }).catch((err) => {
    this._vm.$q.notify({
      color: 'warning',
      textColor: 'grey-9',
      icon: 'error',
      message: err.message
    })
  })
}

export function updateRegistration ({ state, commit }, payload) {
  // commit('setBusiness', payload)
  // commit('setTemplate', payload.db_name)
  console.log(payload)
  return this._vm.$axios.post('update-registration', payload).then((response) => {
    if (response.data.type === 'success') {
      this._vm.$q.notify({
        color: 'positive',
        textColor: 'grey-9',
        icon: 'send',
        message: response.data.message
      })
      commit('setBusiness', response.data.payload)
      commit('setTemplate', payload.db_name)
      return response.data.payload
    } else {
      this._vm.$q.notify({
        color: 'warning',
        textColor: 'grey-9',
        icon: 'error',
        message: response.data.message
      })
    }
  }).catch((err) => {
    this._vm.$q.notify({
      color: 'warning',
      textColor: 'grey-9',
      icon: 'error',
      message: err.message
    })
  })
}
