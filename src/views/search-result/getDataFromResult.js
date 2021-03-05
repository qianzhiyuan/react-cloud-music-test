import {useRef, useState, useEffect} from "react";
import {getSearchData} from "../../server/getServerData";
import {checkMusic} from "../../utils/checkMusic";

export const useDataApi = (searchText) => {

  const changeIdxLock = useRef(false) // 切换锁
  const [loading, setLoading] = useState(false) // 请求状态
  const [goMore, setGoMore] = useState(false)
  const [selectIdx, setSelectIdx] = useState(0) // 导航索引
  const [navList, setNavList] = useState([{
    name: '综合',
    type: '1018',
    can: true
  }, {
    name: '单曲',
    type: '1',
    can: true
  }, {
    name: '歌单',
    type: '1000',
    can: true
  }, {
    name: '视频',
    type: '1014',
    can: false
  }, {
    name: '歌词',
    type: '1006',
    can: false
  }, {
    name: '声音',
    type: '',
    can: false
  }, {
    name: '播单',
    type: '',
    can: false
  }, {
    name: '云圈',
    type: '',
    can: false
  }, {
    name: '歌手',
    type: '100',
    can: false
  }, {
    name: '专辑',
    type: '10',
    can: false
  }, {
    name: '用户',
    type: '1002',
    can: false
  }])

  useEffect(() => {
    let item = navList[selectIdx]
    const fetchData = async () => {
      if (!item.can) return
      let type = item.type
      let {name, countName} = filterType(type)
      if (item.data) { // 已经存在数据了，空数据是没data内容的
        if (!name) return // 综合不需要再次请求
        if (!goMore) return // 获取更多状态已关闭
        // 当前数据已获取完
        if (item.data[name].length >= item.data[countName]) return
      }
      setLoading(true) // 开始请求
      setGoMore(false) // 关闭状态锁
      try {
        const isMultiple = type === '1018' // 是否是综合
        const {data, returnIdx} = await getSearchData({
          idx: selectIdx,
          all: !isMultiple, // 是否使用较全接口，单独的需要全接口
          keywords: searchText,
          type: type,
          limit: isMultiple ? 30 : 50,
          offset: !item.data ? 0 : item.data[name].length
        });
        let arr = Object.assign([], navList)
        if (arr[returnIdx].data) {
          data[name].length > 0 && data[name].map(item => {
            if (name === 'songs') { // 筛选不可播放的歌曲
              item['canPlay'] = checkMusic(item.privilege)
            }
            return arr[returnIdx].data[name].push(item)
          })
        } else {
          if (1) { // 此if模块为筛选不可播放的歌曲
            let arr = isMultiple ? (data?.song?.songs || []) : (data?.songs || [])
            for (let item of arr) {
              item['canPlay'] = checkMusic(item.privilege)
            }
          }
          arr[returnIdx].data = data
        }
        setNavList(arr);
        setLoading(false)
        changeIdxLock.current = false
      } catch (error) {
        setLoading(false)
        changeIdxLock.current = false
      }
    };
    const filterType = (type) => {
      let name = ''
      let countName = ''
      switch (type) {
        case '1':
          name = 'songs'
          countName = 'songCount'
          break
        case '1000':
          name = 'playlists'
          countName = 'playlistCount'
          break
        default:
          break
      }
      return {name, countName}
    }

    fetchData();
  }, [searchText, goMore, selectIdx, navList]);

  return [{loading, changeIdxLock, selectIdx, navList, goMore}, setSelectIdx, setGoMore];
};
