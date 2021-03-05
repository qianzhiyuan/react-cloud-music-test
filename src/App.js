import React, {memo, useRef, useState, useEffect} from 'react';
import {Routes, Router} from './router/';
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import history from "./router/history";
import Toast from "./components/toast/toast";
import PlayBar from "./components/play-bar/play-bar";
import Audio from "./components/audio/audio";
import {getLocalStorage, removeLocalStorage} from "./utils/stroge";
import {getLoginStatus} from "./server/getServerData";
import {setLoginInfo} from "./store/login";
import {useToast} from "./utils/useToast";
import {CSSTransition} from 'react-transition-group';

function App() {
  const dispatch = useDispatch()
  const loginInfo = useRef(getLocalStorage('loginInfo'))
  const [canShowPage, setCanShowPage] = useState(!loginInfo.current)
  const [nowRouteName, setNowRouteName] = useState(history.location.pathname)
  const {showToast} = useToast()
  const {showToastBol, toastText, playLists} = useSelector(state => ({
    showToastBol: state.toast.showToast,
    toastText: state.toast.toastText,
    playLists: state.playList.playLists
  }), shallowEqual)

  useEffect(() => {
    const audio = document.getElementById('audio')
    let unListen = history.listen((location) => {
      // 切换页面回到顶部
      if ((document.body.scrollTop || document.documentElement.scrollTop > 0) &&
        location.action !== 'POP'
      ) {
        window.scrollTo(0, 0)
      }
      setNowRouteName(location.pathname)
    });

    async function checkLoginStatus() {
      let bol = await getLoginStatus()
      if (!bol) {
        console.log('当前登录已失效....');
        showToast('当前登录已失效', 3000)
        removeLocalStorage('loginInfo')
        dispatch(setLoginInfo())
        if (history.location.pathname !== '/index') {
          history.replace('/index')
        }
      }
      setCanShowPage(true)
    }

    loginInfo.current && checkLoginStatus();

    function goPlay() {
      audio && audio.play()
      audio && audio.pause()
    }

    document.addEventListener('WeixinJSBridgeReady', goPlay, false);
    return () => {
      unListen()
      document.removeEventListener("WeixinJSBridgeReady", goPlay, false)
    }
  }, [dispatch, showToast])

  const showPlayBar = playLists.length > 0 && nowRouteName !== '/playlist'

  return (
    <>
      {
        canShowPage && <Router history={history}>
          <Routes/>
        </Router>
      }
      {
        <CSSTransition in={showPlayBar} timeout={300} classNames="from-bottom-to-top" unmountOnExit>
          <PlayBar nowRouteName={nowRouteName}/>
        </CSSTransition>
      }
      {
        showToastBol &&
        <Toast toastText={toastText}/>
      }
      {
        <Audio/>
      }
    </>
  )
}

export default memo(App);
