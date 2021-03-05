import React, {memo, useState} from "react";
import "./search.scss";
import history from "../../router/history";
import SearchInput from "./in-cop/search-input";
import {searchIcon} from "../../libs/font-icon";

function Search(props) {
  const [inputVal, setInputVal] = useState('')
  const [showMore, setShowMore] = useState(false)

  // 搜索输入
  function inputChange(e) {
    setInputVal(e.target.value)
  }

  // 跳转到搜索结果页面
  function goSearch(search) {
    let searchText = encodeURIComponent(search)
    history.push(`/search/${searchText}`)
  }

  return (
    <div className="search-ctx">
      {/* top */}
      <div className="search-fix-top flex-between-center">
        <p className="search-input-div">
          <span className="search-icon">{searchIcon}</span>
          <input type="text" placeholder={props.searchDefault} autoFocus={true}
                 value={inputVal}
                 onChange={e => inputChange(e)}/>
          {
            inputVal &&
            <span className="search-cancel-icon" onClick={() => setInputVal('')}>X</span>
          }
        </p>
        <p onClick={() => props.close()}>取消</p>
      </div>

      {/* history */}
      {/*<div className=""></div>*/}

      {/* hot-search 热搜列表 */}
      {
        props.hotList.length > 0 &&
        <div>
          <div className="hot-search-list-top flex-between-center">
            <span>热搜榜</span>
            <span className="hot-search-play-btn flex-center-center">播放</span>
          </div>
          <div>
            <div className="hot-search-list-div">
              {
                props.hotList.map((item, idx) => {
                  if (!showMore && idx > 9) return null
                  const isPrevNo = idx < 3
                  return <p className={`hot-search-list-item ${isPrevNo ? 'bold' : ''}`}
                            key={item.score} onClick={() => goSearch(item.searchWord)}>
                    <span className={`hot-search-list-num ${isPrevNo ? 'red' : ''}`}>
                      {idx + 1}
                    </span>
                    {item.searchWord}
                    {item.iconUrl && <img src={item.iconUrl} alt=""/>}
                  </p>
                })
              }
            </div>
            {
              !showMore &&
              <p className="hot-search-more" onClick={() => setShowMore(!showMore)}>展开更多热搜</p>
            }
          </div>
        </div>
      }

      {
        inputVal.length > 0 &&
        <SearchInput inputVal={inputVal} link={(search) => goSearch(search)}/>
      }
    </div>
  );
}

export default memo(Search);
