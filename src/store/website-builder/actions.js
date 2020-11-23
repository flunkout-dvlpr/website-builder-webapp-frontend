
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

export function updateSlides ({ commit }, payload) {
  commit('setSlides', payload)
}

export function updateAboutUs ({ commit }, payload) {
  commit('setAboutUs', payload)
}

export function updateHighlights ({ commit }, payload) {
  commit('setHighlights', payload)
}

export function updateTeamMembers ({ commit }, payload) {
  commit('setTeamMembers', payload)
}

export function updateServices ({ commit }, payload) {
  commit('setServices', payload)
}

export function updateGooglePlace ({ commit }, payload) {
  commit('setGooglePlace', payload)
}

export function updateContactUs ({ commit }, payload) {
  commit('setContactUs', payload)
}

export function generateUploadLink ({ state, commit }, payload) {
  return this._vm.$axios.post('generate-upload-link', payload).then((response) => {
    if (response.data.type === 'success') {
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
