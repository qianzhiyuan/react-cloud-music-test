import React, {memo, useEffect, useState, useCallback} from 'react';
import "./my.scss";
import {lock, clearBodyLocks} from "tua-body-scroll-lock";
import Footer from "../../components/footer/footer";
import {removeLocalStorage} from "../../utils/stroge";
import {setLoginInfo} from "../../store/login";
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import Login from "../../components/login/login";
import {CSSTransition} from 'react-transition-group';

function My(props) {
  const dispatch = useDispatch()
  const [showLoginBlock, setShowLoginBlock] = useState(false)
  const {loginInfo} = useSelector(state => ({
    loginInfo: state.login.loginInfo
  }), shallowEqual)

  useEffect(() => {
    const elementOne = document.querySelector('.index-container')
    lock(elementOne)
    return () => {
      clearBodyLocks()
    }
  }, [])

  const toggleShowLogin = useCallback((bol = !showLoginBlock) => {
    setShowLoginBlock(bol)
  }, [showLoginBlock])

  // 退出登录
  const logout = () => {
    removeLocalStorage('loginInfo')
    dispatch(setLoginInfo())
  }

  return (
    <div className="my-container">
      <div className="my-sidebar-top">
        <p className="my-sidebar-round-icon">
          {
            loginInfo?.profile?.backgroundUrl &&
            <img src={loginInfo?.profile?.backgroundUrl} alt=""/>
          }
        </p>
        <div>
          <p>{loginInfo ? loginInfo?.profile?.nickname : '立即登录'}</p>
          {/*<p className="min-level"> lv.9</p>*/}
        </div>
      </div>
      {
        loginInfo ?
          <p className="my-sidebar-bottom flex-center-center"
             onClick={logout}>
            退出登录
          </p> :
          <p className="my-sidebar-bottom flex-center-center"
             onClick={toggleShowLogin}>
            登录
          </p>
      }
      <Footer type={'/my'} showMy={true} toggleMyPage={(bol) => props.toggleMyPage(bol)}/>
      {
        <CSSTransition in={!!showLoginBlock} timeout={300} classNames="alert" unmountOnExit>
          <Login close={() => toggleShowLogin(false)}/>
        </CSSTransition>
      }
    </div>
  );
}

export default memo(My);
