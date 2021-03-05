import {LOGIN_INFO} from "./loginContance";
import {getLocalStorage} from "../../utils/stroge";

const defaultState = {
  loginInfo: getLocalStorage('loginInfo')
}

export const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_INFO:
      return state = {...state, loginInfo: action.loginInfo}
    default:
      return state
  }
}
