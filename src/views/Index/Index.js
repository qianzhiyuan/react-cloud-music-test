import React, {memo, useState, useEffect, useRef, useCallback} from 'react';
import "./index.scss"
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import Header from "../../components/header/header";
import Banner from "./in-cop/banner/banner";
import RecommendNav from "./in-cop/recommend-nav/recommend-nav";
import IndexList from "./in-cop/index-list/index-list";
import Footer from "../../components/footer/footer";
import SideBar from "./in-cop/sidebar/sidebar";
import My from "../my/my";
import {getBannerData, getHomeData, getHomeIconData} from "../../server/getServerData";
import {setIndexBanner, setIndexList, setIndexNavList} from "./store";
import {CSSTransition} from 'react-transition-group';

function Index() {
  const [showSidebar, setShowSidebar] = useState(false) // 展示侧边栏 setShowSidebar
  const [showMy, setShowMy] = useState(false) // 展示我的页面
  const dispatch = useDispatch();
  const {banners, navList, list, loginInfo} = useSelector(state => ({
    banners: state.index.banners, // 首页广告
    navList: state.index.navList, // 导航列表
    list: state.index.list, // 首页数据
    loginInfo: state.login.loginInfo // 用户登录信息
  }), shallowEqual);
  const indexRef = useRef({
    bannersStatus: banners.length > 0,
    navListsStatus: navList.length > 0,
    listStatus: list.length > 0,
    loginStatus: !!loginInfo
  })

  /*
  * 初次进入页面请求数据，
  * 去到别的页面回来不刷新（list判断）
  *  */
  useEffect(() => {
    const loginStatus = indexRef.current.loginStatus
    async function fetchData(force = false) {
      if (!indexRef.current.bannersStatus) {
        const banners = await getBannerData()
        indexRef.current.bannersStatus = true
        dispatch(setIndexBanner(banners))
      }
      if (!indexRef.current.navListsStatus) {
        const navLists = await getHomeIconData()
        indexRef.current.navListsStatus = true
        dispatch(setIndexNavList(navLists))
      }
      if (!indexRef.current.listStatus || force) {
        const list = await getHomeData()
        indexRef.current.listStatus = true
        dispatch(setIndexList(list))
      }
    }

    if (loginStatus === !!loginInfo) {
      fetchData()
    } else {
      indexRef.current.loginStatus = !!loginInfo
      fetchData(true)
    }
  }, [dispatch, loginInfo])

  function showType(type) {
    switch (type) {
      case 'HOMEPAGE_SLIDE_PLAYLIST':
        return 'standard'
      case 'HOMEPAGE_SLIDE_SONGLIST_ALIGN':
        return 'list'
      default:
        return 'standard'
    }
  }

  const toggleSideBar = useCallback((bol = !showSidebar) => {
    setShowSidebar(bol)
  }, [showSidebar])

  const toggleMyPage = useCallback((bol = !showMy) => {
    setShowMy(bol)
  }, [showMy])

  return (
    <div className="App index-container padding-fixed-footer">
      {/* 头部 */}
      <Header loginInfo={loginInfo} toggleSideBar={(bol) => toggleSideBar(bol)}/>
      {/* 首页banner */}
      {
        banners.length > 0 && <Banner banners={banners}/>
      }
      {
        navList.length > 0 &&
        <RecommendNav navList={navList}/>
      }
      {
        list.length > 0 && list.map((item, idx) => {
          const exitMainTitle = item?.uiElement?.mainTitle
          const subTitle = item?.uiElement?.subTitle?.title
          return <IndexList key={idx}
                            title={exitMainTitle ? exitMainTitle.title : subTitle}
                            minTitle={exitMainTitle && subTitle}
                            type={showType(item.showType)}
                            data={item.creatives}/>
        })
      }
      <Footer type={'/index'} showMy={showMy} toggleMyPage={toggleMyPage}/>
      {/* 侧边栏 */}
      {
        <CSSTransition in={showSidebar} timeout={300} classNames="forward-from-left" unmountOnExit>
          <SideBar toggleSideBar={(bol) => toggleSideBar(bol)}/>
        </CSSTransition>
      }
      {
        <CSSTransition in={showMy} timeout={300} classNames="from-bottom-to-top" unmountOnExit>
          <My toggleMyPage={toggleMyPage}/>
        </CSSTransition>
      }
    </div>
  )
}

export default memo(Index);
