import React, {memo, useState} from 'react';
import "./login.scss";
import {useDispatch} from "react-redux";
import {useToast} from "../../utils/useToast";
import {getLoginData} from "../../server/getServerData";
import {setLocalStorage} from "../../utils/stroge";
import {setLoginInfo} from "../../store/login";

function Login(props) {
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const {showToast} = useToast()

  function changeInput(e) {
    let name = e.target.name
    let value = e.target.value
    if (name === 'phone') {
      setPhone(value)
    } else {
      setPassword(value)
    }
  }

  async function login() {
    let isCheckObj = {
      [password.length < 5]: '请输入正确的账号密码',
      [!/^[1][3456789][0-9]{9}$/.test(phone)]: '请输入正确的手机号码',
      [phone.length !== 11]: '请输入正确的手机号码'
    }
    if (isCheckObj[true]) {
      showToast(isCheckObj[true])
      return
    }
    try {
      let res = await getLoginData(phone, password)
      if (res?.code === 200) {
        setLocalStorage('loginInfo', res)
        dispatch(setLoginInfo(res))
        close()
      } else {
        showToast('账号或密码错误，请重试')
      }
    } catch (e) {
      showToast('登录异常，请稍后重试')
    }
  }

  function close() {
    props.close()
  }

  return (
    <div className="login-container">
      <p className="login-top flex-between-center">
        <span onClick={close}>く</span>
        登录
        <span>
        </span>
      </p>
      <div className="input-login-ctx">
        <p>登录体验更多精彩-仅支持账号密码登录</p>
        <p className="input-login-div">
          <input type="tel" maxLength={11}
                 name={'phone'} value={phone}
                 onChange={e => changeInput(e)}
                 placeholder="请输入手机号码"/>
        </p>
        <p className="input-login-div">
          <input type="password" maxLength={20}
                 name={'password'} value={password}
                 onChange={e => changeInput(e)}
                 placeholder="请输入账号密码"/>
        </p>
        {/* login-btn */}
        <p className={`input-login-btn 
          ${phone.length === 11 &&
        password.length > 5 ? 'active' : ''}`}
           onClick={() => login()}>
          登 录
        </p>
      </div>
    </div>
  );
}

export default memo(Login);
