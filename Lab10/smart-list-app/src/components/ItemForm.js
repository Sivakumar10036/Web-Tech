import React, { useState } from "react";

function ItemForm(props)
{
    const [text, setText] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [date, setDate] = useState("");

    function handleSubmit(e)
    {
        e.preventDefault();

        if (text.trim() === "") return;

        props.addItem(text, priority, date);
        setText("");
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <input
                placeholder="Enter task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <select onChange={(e) => setPriority(e.target.value)}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>

            <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
            />

            <button>Add</button>
        </form>
    );
}

export default ItemForm;