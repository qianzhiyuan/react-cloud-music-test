import {combineReducers} from "redux";
import {indexReducer} from "../views/Index/store";
import {searchReducer} from "../components/header/store";
import {toastReducer} from "./toast";
import {loginReducer} from "./login";
import {playListReducers} from "./palyList";
import {playReducer} from "./play/playReducer";

const rootReducer = combineReducers({
  index: indexReducer,
  search: searchReducer,
  toast: toastReducer,
  login: loginReducer,
  playList: playListReducers,
  play: playReducer
})

export default rootReducer;
