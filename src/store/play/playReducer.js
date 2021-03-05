import {PLAY_STATUS, PLAY_MODE, PLAY_TIME, ALL_TIME, ALL_TIMESTAMP, PROGRESS_PERCENT} from "./playConstance";

const defaultState = {
  playStatus: false, // true->play false->pause
  playMode: 1, // 【1:列表】【2:随机】【3:单曲】
  playTime: '', // 当前播放时间(mm:ss)
  allTime: '', // 总播放时间(mm:ss)
  allTimeStamp: 0, // 总播放时间(s)
  progressPercent: 0, // 总播放时间(s)
}

export const playReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PLAY_STATUS:
      return state = {...state, playStatus: action.playStatus}
    case PLAY_MODE:
      return state = {...state, playMode: action.playMode}
    case PLAY_TIME:
      return state = {...state, playTime: action.playTime}
    case ALL_TIME:
      return state = {...state, allTime: action.allTime}
    case ALL_TIMESTAMP:
      return state = {...state, allTimeStamp: action.allTimeStamp}
    case PROGRESS_PERCENT:
      return state = {...state, progressPercent: action.progressPercent}
    default:
      return state
  }
}
