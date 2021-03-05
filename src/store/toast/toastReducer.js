import {HIDE_TOAST, SHOW_TOAST} from "./toastConstance";

const defaultState = {
  toastText: '',
  showToast: false
}

export const toastReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return state = {...state, showToast: true, toastText: action.text}
    case HIDE_TOAST:
      return state = {...state, showToast: false, toastText: ''}
    default:
      return state
  }
}
