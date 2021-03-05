import {SET_PLAY_LIST, ADD_PLAY_LIST, REMOVE_PLAY_LIST, PLAY_INDEX} from "./playListConstance";
import {getRandom} from "../../utils/getRandom";

export const setPlayList = (list = []) => ({
  type: SET_PLAY_LIST,
  list
})

export const addPlayList = (item) => ({
  type: ADD_PLAY_LIST,
  item
})

export const removePlayList = (idx) => ({
  type: REMOVE_PLAY_LIST,
  idx
})

export const setPlayIdx = (idx) => ({
  type: PLAY_INDEX,
  idx
})

/*
* 添加歌曲-[type：[play：添加后播放][add：单纯添加]]
* */
export const addPlayListAction = (item, type = 'add') => {
  return (dispatch, getState) => {
    const playLists = getState().playList.playLists
    let idx = playLists.findIndex(findItem => {
      return findItem.id === item.id
    })
    if (idx === -1) {
      dispatch(addPlayList(item))
    } else {
      // console.log('exit.id: ', idx); // 当前ID已在播放列表
    }
    if (type === 'play') { // 需要立即播放
      // console.log(idx === -1, playLists.length, idx);
      dispatch(setPlayIdx(idx === -1 ? playLists.length : idx))
    }
  }
}

export const prevPlayAction = () => {
  return (dispatch, getState) => {
    const {playLists, playIdx} = getState().playList
    const {playMode} = getState().play
    if (playMode !== 2) {
      let isFirst = playIdx === 0
      dispatch(setPlayIdx(isFirst ? playLists.length - 1 : playIdx - 1))
    } else { // 当前播放为随机播放模式
      if (playLists.length <= 1) return
      let randomIdx = getRandom(0, playLists.length)
      while (randomIdx === playIdx) {
        randomIdx = getRandom(0, playLists.length)
      }
      dispatch(setPlayIdx(randomIdx))
    }
  }
}

export const nextPlayAction = () => {
  return (dispatch, getState) => {
    const {playLists, playIdx} = getState().playList
    const {playMode} = getState().play
    if (playMode !== 2) { // 当前播放不是随机播放
      let isLast = playIdx + 1 === playLists.length
      dispatch(setPlayIdx(isLast ? 0 : playIdx + 1))
    } else { // 当前播放为随机播放模式
      if (playLists.length <= 1) return
      let randomIdx = getRandom(0, playLists.length - 1)
      while (randomIdx === playIdx) {
        randomIdx = getRandom(0, playLists.length - 1)
      }
      dispatch(setPlayIdx(randomIdx))
    }
  }
}
