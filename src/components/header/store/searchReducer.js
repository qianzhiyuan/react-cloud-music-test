import {SEARCH_DEFAULT, SEARCH_HOTLIST, SEARCH_SHOW} from "./searchConstants";

let defaultStatus = {
  searchDefault: '',
  hotList: [],
  showSearch: false
}

let searchReducer = (state = defaultStatus, action) => {
  switch (action.type) {
    case SEARCH_DEFAULT:
      return state = {...state, searchDefault: action.val}
    case SEARCH_HOTLIST:
      return state = {...state, hotList: [].concat(action.list)}
    case SEARCH_SHOW:
      return state = {...state, showSearch: action.show}
    default:
      return state
  }
}

export default searchReducer;
