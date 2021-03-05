import React, {memo, useState, useCallback} from 'react';
import "./sidebar.scss";
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import Login from "../../../../components/login/login";
import {setLoginInfo} from "../../../../store/login";
import {removeLocalStorage} from "../../../../utils/stroge";

function SideBar(props) {
  const dispatch = useDispatch()
  const [showLoginBlock, setShowLoginBlock] = useState(false)
  const {loginInfo} = useSelector(state => ({
    loginInfo: state.login.loginInfo
  }), shallowEqual)

  const toggleShowLogin = useCallback((bol = !showLoginBlock) => {
    setShowLoginBlock(bol)
  }, [showLoginBlock])

  // 退出登录
  const logout = () => {
    removeLocalStorage('loginInfo')
    dispatch(setLoginInfo())
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar-left-part">
        <div className="sidebar-top" onClick={loginInfo? null : toggleShowLogin}>
          {
            loginInfo?.profile?.backgroundUrl ?
              <img className="sidebar-round-icon" src={loginInfo?.profile?.backgroundUrl} alt={''}/> :
              <p className="sidebar-round-icon"></p>
          }
          <span>{loginInfo ? loginInfo?.profile?.nickname : '立即登录'}</span>
        </div>
        {
          loginInfo &&
          <div className="sidebar-bottom flex-center-center"
               onClick={logout}>
            退出登录
          </div>
        }
      </div>
      <p className="right-null-part" onClick={() => props.toggleSideBar(false)}>
      </p>
      {
        showLoginBlock &&
        <Login close={() => toggleShowLogin(false)}/>
      }
    </div>
  );
}

export default memo(SideBar);
