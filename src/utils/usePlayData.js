import {useState, useEffect} from "react";
import {getSongDetailData, getSongUrlData} from "../server/getServerData";
import {checkMusic} from "./checkMusic";

export const usePlayData = (id = '') => {
  let [list, setList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const {list, privileges} = await getSongDetailData(id)
      const songIds = list.reduce((prev, item) => {
        if (item.fee !== 1) return prev
        return (prev += prev ? ',' : '') + item.id
      }, '')
      let songUrl = songIds ? await getSongUrlData(songIds) : []
      const songObj = {}
      for (let item of songUrl) {
        const id = item.id
        // item.playUrl = item.fee === 1 ? item.url : `https://music.163.com/song/media/outer/url?id=${id}.mp3`
        songObj[id] = item
      }
      for (let [idx, item] of Object.entries(list)) {
        let checkItem = privileges[idx]
        // list[idx]['songItem'] = songObj[item.id]
        list[idx]['canPlay'] = checkMusic(checkItem)
        if (item.fee === 1) { // VIP歌曲
          list[idx]['playUrl'] = songObj[item.id].url
        } else {
          list[idx]['playUrl'] = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
        }
      }
      setList(list)
    }
    id.length > 0 && fetchData()
  }, [id])



  return {
    list
  }
}
