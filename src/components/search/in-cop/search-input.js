import React, {memo, useState, useEffect} from 'react';
import "./search-input.scss";
import {getSearchSuggestData} from "../../../server/getServerData";

function SearchInput(props) {
  const [list, setList] = useState([])

  useEffect(() => {
    async function fetchData() {
      let list = await getSearchSuggestData(props.inputVal)
      setList(list)
    }
    fetchData()
  }, [props.inputVal])

  return (
    <div className="search-input-ctx">
      <p className="search-input-blue-line one-line-overflow-ellipsis">
        搜索 “{props.inputVal}”
      </p>

      <div className="search-input-answer-div">
        {
          list.length > 0 && list.map((item, idx) => {
            return <p className="search-input-answer" key={idx}
                      onClick={() => props.link(item.keyword)}>
              {item.keyword}
            </p>
          })
        }
      </div>
    </div>
  );
}

export default memo(SearchInput);
