import React from "react";
import { useLocation } from "react-router-dom";

function Welcome()
{
    const location = useLocation();
    const name = location.state?.name || "User";

    return (
        <div className="welcome">
            <h2>🎉 Welcome!</h2>
            <h1>Hello, {name} 👋</h1>
        </div>
    );
}

export default Welcome;