
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

export function setSlides (state, payload) {
  state.slides = payload
}

export function setAboutUs (state, payload) {
  state.aboutUs = payload
}

export function setHighlights (state, payload) {
  state.highlights = payload
}

export function setTeamMembers (state, payload) {
  state.teamMembers = payload
}

export function setServices (state, payload) {
  state.services = payload
}

export function setGooglePlace (state, payload) {
  state.googlePlace = payload
  state.reviews = payload.reviews
}

export function setContactUs (state, payload) {
  state.contactUs = payload
}
