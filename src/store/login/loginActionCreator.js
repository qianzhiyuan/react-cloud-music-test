import {LOGIN_INFO} from "./loginContance";

export const setLoginInfo = (loginInfo = null) => ({
  type: LOGIN_INFO,
  loginInfo
})
