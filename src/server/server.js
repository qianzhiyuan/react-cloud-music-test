import axios from "axios";
import {Api} from "./api";
import {getLocalStorage} from "../utils/stroge";
import {timestamp} from "../utils/getTimeStamp";

axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response?.data || {};
}, error => {
  return Promise.reject(error);
});

function getCookie() {
  return getLocalStorage('loginInfo')?.cookie || ''
}

/*
* 获取首页banner
* */
export function getBanner(type) {
  return axios.get(Api.banner + '?type=' + type)
}

/*
* 获取首页内容
* */
export function getHomeInfo() {
  return axios({
    url: Api.homeInfo,
    params: {
      refresh: true,
      timestamp: timestamp,
      cookie: getCookie()
    }
  })
}

/*
* 获取首页icon
* */
export function getHomeIcon() {
  return axios.get(Api.homeIcon)
}

/*
* 获取歌单列表
* */
export function getPlayList(id) {
  // 可选参数s : 歌单最近的 s 个收藏者,默认为8
  return axios({
    url: Api.playlist,
    params: {
      id: id,
      cookie: getCookie()
    }
  })
}

/*
* 获取歌曲详情
* 支持多个 id, 用 , 隔开
* */
export function getSongDetail(ids) {
  return axios({
    url: Api.songDetail,
    params: {
      ids: ids,
      cookie: getCookie()
    }
  })
}

/*
* 获取音乐URL
* 支持多个 id, 用 , 隔开
* */
export function getSongUrl(ids) {
  return axios({
    url: Api.songUrl,
    params: {
      id: ids,
      cookie: getCookie()
    }
  })
}

/*
* 搜索功能（全面搜索）
* 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户
* 关键词可以多个 , 以空格隔开
* keywords: 关键词
* limit : 返回数量 , 默认为 30
* offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
* type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV,
* 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
* */
export function getSearch({all, keywords, type, ...others}) {
  return axios({
    url: all ? Api.searchAll : Api.search,
    method: 'GET',
    params: Object.assign({
      keywords: keywords,
      type: type,
      cookie: getCookie()
    }, others)
  })
}

/*
* 获取默认搜索关键词
* */
export function getSearchDefault() {
  return axios({
    url: Api.searchDefault,
    params: {
      cookie: getCookie(),
      timestamp: timestamp
    }
  })
}

/*
* 热搜列表
* */
export function getSearchHotList() {
  return axios({
    url: Api.searchHotList,
    params: {
      cookie: getCookie()
    }
  })
}

/*
* 热搜建议
* */
export function getSearchSuggest(keyWords) {
  return axios({
    url: Api.searchSuggest,
    params: {
      keywords: keyWords,
      type: 'mobile',
      cookie: getCookie(),
      timestamp: timestamp
    }
  })
}

/*
* 登录
* */
export function login({phone, md5_password}) {
  return axios({
    url: Api.login,
    method: 'GET',
    params: {
      phone: phone,
      md5_password: encodeURIComponent(md5_password),
    }
  })
}

/*
* 刷新登录
* */
export function refreshLogin() {
  return axios({
    url: Api.refreshLogin,
    params: {
      cookie: getCookie()
    }
  })
}

/*
* 获取登录状态
* */
export function loginStatus() {
  return axios({
    url: Api.loginStatus,
    params: {
      cookie: getCookie()
    }
  })
}

/*
* 退出登录
* */
export function logout() {
  return axios({
    url: Api.logout,
    params: {
      cookie: getCookie()
    }
  })
}

export function getLyric(id) {
  return axios.get(Api.lyric + '?id=' + id)
}

export function getCheck(id) {
  return axios.get(Api.check + '?id=' + id)
}

export {
  axios
}
