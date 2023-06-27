import React, { useEffect, useState } from "react";
import { AntTooltip } from "../..";

function SearchInput({ getSearchValue, searchPlaceholder, extraClassName }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.length >= 3 || search.length === 0) {
        getSearchValue(search);
      }
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleSearchValue = (val) => {
    setSearch(val);
  };

  return (
    <AntTooltip
      placement="topLeft"
      promptText={`Search by ${searchPlaceholder}`}
    >
      <div className={extraClassName}>
        <div className="form-control-wrap">
          <div className="form-icon">
            <span className="icon-search" />
          </div>
          <input
            className="form-control form-control-search"
            type="search"
            placeholder="Type 3 or more characters"
            onChange={(e) => handleSearchValue(e.target.value)}
            value={search}
          />
        </div>
      </div>
    </AntTooltip>
  );
}
export default SearchInput;
