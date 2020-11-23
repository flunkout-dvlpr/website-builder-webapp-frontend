
export function setBusiness (state, payload) {
  for (var key in payload) {
    if (state.business[key] !== payload[key]) {
      state.business[key] = payload[key]
    }
  }
}

export function setTemplate (state, payload) {
  state.template = payload
}
