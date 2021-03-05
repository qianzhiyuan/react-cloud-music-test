import {PLAY_STATUS, PLAY_MODE, PLAY_TIME, ALL_TIME, ALL_TIMESTAMP, PROGRESS_PERCENT}
  from "./playConstance";

export const changePlayStatus = (playStatus) => ({
  type: PLAY_STATUS,
  playStatus
})

export const changePlayMode = (playMode = 1) => ({
  type: PLAY_MODE,
  playMode
})

export const setPlayTime = (playTime = '') => ({
  type: PLAY_TIME,
  playTime
})

export const setAllTime = (allTime = '') => ({
  type: ALL_TIME,
  allTime
})

export const setAllTimeStamp = (allTimeStamp = 0) => ({
  type: ALL_TIMESTAMP,
  allTimeStamp
})

export const setProgressPercent = (progressPercent = 0) => ({
  type: PROGRESS_PERCENT,
  progressPercent
})
