import {
  getHomeInfo,
  getHomeIcon,
  getPlayList,
  getSongDetail,
  getSongUrl,
  getSearchDefault,
  getSearchHotList, getSearchSuggest, getSearch, login, refreshLogin, loginStatus, logout, getBanner, getLyric, getCheck
} from "./server";
import md5 from "blueimp-md5"

export const getBannerData = async () => {
  let banner = []
  let res = await getBanner(2)
  if (res && res.code === 200) {
    banner = res.banners
  }
  return banner
}

/*
* 获取首页数据
* */
export const getHomeData = async () => {
  let list = []
  let res = await getHomeInfo();
  if (res && res.code === 200) {
    let {blocks} = res.data
    // console.log(blocks);
    for (let item of blocks) {
      filterData(item.showType, item)
    }
  }

  function filterData(type, item) {
    switch (type) {
      // 推荐歌单的样式风格
      case 'HOMEPAGE_SLIDE_PLAYLIST':
        list.push(item)
        break
      // 私人定制
      case 'HOMEPAGE_SLIDE_SONGLIST_ALIGN':
        list.push(item)
        break
      default:
    }
  }

  // console.log(data);
  return list;
}

/*
* 获取首页icon
* */
export const getHomeIconData = async () => {
  let list = []
  let res = await getHomeIcon();
  if (res && res.code === 200) {
    list = res.data
  }
  return list
}

/*
* 获取歌单列表
* 未登录时候获取的是不完整的，所以需要/song/detail接口获取完整数据
* */
export const getPlayListData = async (id) => {
  let list = []
  let res = await getPlayList(id)
  if (res && res.code === 200) {
    list = res.playlist
  }
  return list
}

/*
* 获取歌曲详情
* */
export const getSongDetailData = async (ids) => {
  let list = []
  let privileges = []
  let res = await getSongDetail(ids)
  if (res && res.code === 200) {
    list = res.songs
    privileges = res.privileges
  }
  return {
    list,
    privileges
  }
}

/*
* 获取音乐播放URL
* */
export const getSongUrlData = async (ids) => {
  let list = []
  let res = await getSongUrl(ids)
  if (res && res.code === 200) {
    list = res.data
  }
  return list
}

/*
* 获取搜索内容
* */
export const getSearchData = async ({idx, all = false, keywords, type = '1', ...other}) => {
  let searchRes = null
  let res = await getSearch(Object.assign({
    all: all,
    keywords: keywords,
    type: type,
  }, other))
  if (res.code === 200) {
    searchRes = res.result
  }
  return {
    data: searchRes,
    returnIdx: idx
  }
}

/*
* 获取默认搜索关键词
* */
export const getSearchDefaultData = async () => {
  let keyWordObj = null
  let res = await getSearchDefault()
  if (res && res.code === 200) {
    keyWordObj = res.data ? {
      showKeyWord: res.data.showKeyword,
      realKeyWord: res.data.realkeyword
    } : null
  }
  return keyWordObj
}

/*
* 获取热搜列表
* */
export const getSearchHotListData = async () => {
  let list = []
  let res = await getSearchHotList()
  if (res && res.code === 200) {
    list = res.data
  }
  return list
}

/*
* 获取热搜建议内容
* */
export const getSearchSuggestData = async (keyword) => {
  let list = []
  let res = await getSearchSuggest(keyword)
  if (res && res.code === 200) {
    list = res.result?.allMatch || []
  }
  return list
}

/*
* 登录
* */
export const getLoginData = async (phone, password) => {
  let res = await login({
    phone: phone,
    md5_password: md5(password)
  })
  return res
}

/*
* 刷新登录
* */
export const refreshLoginData = () => {
  refreshLogin()
}

/*
* 获取登录状态
* */
export const getLoginStatus = async () => {
  let bol = false
  try {
    let res = await loginStatus()
    bol = !!(res?.data?.code === 200 && res?.data?.account?.id)
  } catch (e) {
    bol = false
  }
  return bol
}

/*
* 退出登录
* */
export const goLogout = async () => {
  let res = await logout()
  console.log(res);
}

/*
* 获取歌词
* */
export const getLyricData = async (id) => {
  let lyricStr = ''
  let res = await getLyric(id)
  if (res?.code === 200) {
    lyricStr = res?.lrc?.lyric || ''
  }
  return lyricStr
}

/*
* 检查音乐是否可用
* */
export const getCheckData = async (id, no) => {
  let bol = false
  try {
    let res = await getCheck(id)
    bol = res?.success || false
  } catch (e) {
    bol = false
  }
  return {
    bol,
    id,
    no
  }
}
