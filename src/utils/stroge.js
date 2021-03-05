export const getLocalStorage = (name) => {
  if (!window.localStorage.getItem(name)) return null
  return JSON.parse(window.localStorage.getItem(name))
}

export const setLocalStorage = (name, val) => {
  return window.localStorage.setItem(name, JSON.stringify(val))
}

export const removeLocalStorage = (name) => {
  window.localStorage.removeItem(name)
}

export const getSessionStorage = (name) => {
  if (!window.sessionStorage.getItem(name)) return null
  return JSON.parse(window.sessionStorage.getItem(name))
}

export const setSessionStorage = (name, val) => {
  return window.sessionStorage.setItem(name, JSON.stringify(val))
}

export const removeSessionStorage = (name) => {
  window.sessionStorage.removeItem(name)
}
