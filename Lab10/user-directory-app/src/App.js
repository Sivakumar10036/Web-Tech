import React, { useState } from "react";
import UserList from "./components/UserList";
import "./App.css";

function App()
{
    const [dark, setDark] = useState(false);

    function toggleTheme()
    {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

    return (
        <div className="app">
            <button className="toggle-btn" onClick={toggleTheme}>
                Toggle Theme
            </button>

            <h1>User Directory</h1>
            <UserList />
        </div>
    );
}

export default App;