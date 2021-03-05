import {SHOW_TOAST, HIDE_TOAST} from "./toastConstance";

export const setShowToast = (text = '') => ({
  type: SHOW_TOAST,
  text
})

export const setHideToast = () => ({
  type: HIDE_TOAST
})
