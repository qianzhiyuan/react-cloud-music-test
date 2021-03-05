const API = 'http://120.78.201.242:4396'

export const Api = {
  banner: API + '/banner',
  homeInfo: API + '/homepage/block/page', // 首页信息
  homeIcon: API + '/homepage/dragon/ball', // 首页导航icon
  playlist: API + '/playlist/detail', // 获取歌单列表
  songDetail: API + '/song/detail', // 获取歌曲详情
  songUrl: API + '/song/url', // 获取音乐url
  search: API + '/search', // 搜索音乐
  searchAll: API + '/cloudsearch', // 搜索音乐-全
  searchDefault: API + '/search/default', // 默认搜索
  searchHotList: API + '/search/hot/detail', // 热搜列表
  searchSuggest: API + '/search/suggest', // 搜索建议
  login: API + '/login/cellphone', // 登录
  refreshLogin: API + '/login/refresh', // 刷新登录
  loginStatus: API + '/login/status', // 获取登录状态
  logout: API + '/logout', // 退出登录
  lyric: API + '/lyric', // 获取歌词
  check: API + '/check/music', // 判断是否有版权
}
