import {INDEX_NAVLIST, INDEX_BANNER, INDEX_LIST} from "./indexConstants";

const defaultStatus = {
  navList: [], // 导航列表
  banners: [], // 首页banner
  list: [], // 推荐列表
}

export const indexReducer = (state = defaultStatus, action) => {
  switch (action.type) {
    case INDEX_NAVLIST:
      return state = {...state, navList: [].concat(action.navList)}
    case INDEX_BANNER:
      return state = {...state, banners: [].concat(action.banners)}
    case INDEX_LIST:
      return state = {...state, list: [].concat(action.list)}
    default:
      return state
  }
}
