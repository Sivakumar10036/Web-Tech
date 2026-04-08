import React from "react";

function SearchBar(props)
{
    return (
    (
        <input
            type="text"
            placeholder="Search items..."
            value={props.search}
            onChange={(event) => props.setSearch(event.target.value)}
            className="search"
        />
    )
    );
}

export default SearchBar;