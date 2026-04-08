import React from "react";

function Item(props)
{
    const item = props.item;

    return (
        <div className={`item ${item.completed ? "done" : ""}`}>
            <div>
                <h3>{item.text}</h3>
                <p>{item.date}</p>
                <span className={`badge ${item.priority.toLowerCase()}`}>
                    {item.priority}
                </span>
            </div>

            <div>
                <button onClick={() => props.toggleComplete(item.id)}>✔</button>
                <button onClick={() => props.removeItem(item.id)}>❌</button>
            </div>
        </div>
    );
}

export default Item;