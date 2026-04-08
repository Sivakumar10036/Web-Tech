import React from "react";

function SearchBar(props)
{
    return (
        <div className="controls">
            <input
                type="text"
                placeholder="Search by name..."
                value={props.search}
                onChange={(e) => props.setSearch(e.target.value)}
            />

            <select
                value={props.sortOrder}
                onChange={(e) => props.setSortOrder(e.target.value)}
            >
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
            </select>

            <button onClick={props.reload}>
                Reload
            </button>
        </div>
    );
}

export default SearchBar;