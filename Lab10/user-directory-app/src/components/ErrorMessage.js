import React from "react";

function ErrorMessage(props)
{
    return (
        <div className="error">
            <h2>{props.message}</h2>
            <button onClick={props.onRetry}>Retry</button>
        </div>
    );
}

export default ErrorMessage;