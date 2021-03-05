import {useRef, useCallback} from "react";
import {setShowToast, setHideToast} from "../store/toast";
import {useDispatch} from "react-redux";

export const useToast = () => {
  const toastRef = useRef(null)
  const dispatch = useDispatch()

  const hideToast = useCallback(() => {
    dispatch(setHideToast())
  }, [dispatch])

  const showToast = useCallback((text, time = 2000) => {
    if (toastRef.current) clearTimeout(toastRef.current)
    dispatch(setShowToast(text))
    toastRef.current = setTimeout(() => {
      hideToast()
      toastRef.current = null
    }, time)
  }, [dispatch, hideToast])

  return {
    showToast: showToast,
    hideToast: hideToast
  }
}
