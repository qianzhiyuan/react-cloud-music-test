import Index from "../views/Index/Index";
import SongList from "../views/song-list/song-list";
import SearchResult from "../views/search-result/search-result";
import Play from "../views/play/play";

export const RouterConfig = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/songlist/:id',
    component: SongList,
    regPath: 'songlist',
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right'
    }
  },
  {
    path: '/search/:search',
    name: '搜索结果',
    component: SearchResult,
    regPath: 'search',
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right'
    }
  },
  {
    path: '/playlist',
    name: '播放',
    component: Play,
    regPath: 'play',
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom'
    }
  }
];
