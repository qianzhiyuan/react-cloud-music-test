import {SEARCH_DEFAULT, SEARCH_HOTLIST, SEARCH_SHOW} from "./searchConstants";

export const setDefaultSearch = (val = '') => ({
  type: SEARCH_DEFAULT,
  val
})

export const setHotList = (list = []) => ({
  type: SEARCH_HOTLIST,
  list
})

export const setShowSearch = (show = false) => ({
  type: SEARCH_SHOW,
  show
})
