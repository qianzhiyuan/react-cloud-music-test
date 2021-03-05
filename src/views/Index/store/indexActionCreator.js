import {INDEX_NAVLIST, INDEX_BANNER, INDEX_LIST} from "./indexConstants";

export const setIndexNavList = (navList) => ({
  type: INDEX_NAVLIST,
  navList
})

export const setIndexBanner = (banners) => ({
  type: INDEX_BANNER,
  banners
})

export const setIndexList = (list) => ({
  type: INDEX_LIST,
  list
})
