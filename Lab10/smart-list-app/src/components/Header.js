import React from "react";

function Header(props)
{
    return (
        <div className="header">
            <h1>🔥 Smart List App</h1>

            <button
                className="mode-btn"
                onClick={() => props.setDarkMode(!props.darkMode)}
            >
                {props.darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
        </div>
    );
}

export default Header;