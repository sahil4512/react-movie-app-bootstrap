import React from "react";

const SearchBar = (props) => {
  return (
    <div className="col col-sm-4">
      <input
        autoFocus
        className="form-control"
        value={props.value}
        onChange={(event) => props.setSearchBarValue(event.target.value)}
        placeholder="Search Movies"
      ></input>
    </div>
  );
};

export default SearchBar;
