import React, {memo, useEffect, useCallback, useRef} from 'react';
import './header.scss'
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import Search from "../../components/search/search";
import {getSearchDefaultData, getSearchHotListData} from "../../server/getServerData";
import {setDefaultSearch, setHotList, setShowSearch} from "./store";
import {searchIcon, shareIcon, personIcon} from "../../libs/font-icon";
import {useToast} from "../../utils/useToast";

const Header = (props) => {
  const dispatch = useDispatch()
  const {showSearch, searchDefault, hotList} = useSelector(state => ({
    showSearch: state.search.showSearch,
    searchDefault: state.search.searchDefault,
    hotList: state.search.hotList
  }), shallowEqual)
  const searchRef = useRef({
    default: searchDefault.length > 0,
    hotList: hotList.length > 0,
    loginStatus: !!props.loginInfo, // 登录状态
  })
  const {showToast} = useToast()

  useEffect(() => {
    function fetchData(force = false) {
      const goDefault = force || !searchRef.current.default
      goDefault && getSearchDefaultData().then(keyWordObj => {
        searchRef.current.default = true
        keyWordObj && dispatch(setDefaultSearch(keyWordObj.showKeyWord))
      })
      const goHot = force || !searchRef.current.hotList
      goHot && getSearchHotListData().then(list => {
        searchRef.current.hotList = true
        dispatch(setHotList(list))
      })
    }

    // 通过登录状态判断用户是否进行了登录切换，以此决定是否需要更新接口数据
    // 默认情况
    if (!!props.loginInfo === searchRef.current.loginStatus) {
      fetchData()
    } else { // 切换用户
      searchRef.current.loginStatus = !!props.loginInfo
      fetchData(true)
    }
  }, [dispatch, props.loginInfo])

  const toggleShow = useCallback(() => {
    dispatch(setShowSearch(!showSearch))
  }, [dispatch, showSearch])

  return (
    <div className="header-ctx">
      <p className="left-icon flex-center-center" onClick={() => props.toggleSideBar(true)}>
        {personIcon}
      </p>
      <p className="header-search" onClick={() => toggleShow()}>
        <span className="search-icon">{searchIcon}</span>
        <span className="search-text one-line-overflow-ellipsis">
          {searchDefault || '请输入搜索内容'}
        </span>
      </p>
      <p className="right-icon flex-center-center"
         onClick={() => showToast('暂无此功能')}>
        {shareIcon}
      </p>
      {
        showSearch &&
        <div className="absolute-search-ctx">
          <Search searchDefault={searchDefault}
                  hotList={hotList}
                  close={toggleShow}/>
        </div>
      }
    </div>
  )
}

export default memo(Header);
