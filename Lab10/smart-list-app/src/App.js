import React, { useState, useEffect } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import Header from "./components/Header";

function App()
{
    const [items, setItems] = useState(() =>
    {
        const saved = localStorage.getItem("items");
        return saved ? JSON.parse(saved) : [];
    });

    const [darkMode, setDarkMode] = useState(false);
    const [toast, setToast] = useState("");

    useEffect(() =>
    {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    function showToast(message)
    {
        setToast(message);

        setTimeout(() =>
        {
            setToast("");
        }, 2000);
    }

    function addItem(text, priority, date)
    {
        const newItem =
        {
            id: Date.now(),
            text: text,
            priority: priority,
            date: date,
            completed: false
        };

        setItems([...items, newItem]);
        showToast("Item Added ✅");
    }

    function removeItem(id)
    {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        setItems(items.filter(function(item)
        {
            return item.id !== id;
        }));

        showToast("Item Deleted ❌");
    }

    function toggleComplete(id)
    {
        setItems(items.map(function(item)
        {
            if (item.id === id)
            {
                return { ...item, completed: !item.completed };
            }
            return item;
        }));
    }

    function editItem(id, newText)
    {
        setItems(items.map(function(item)
        {
            if (item.id === id)
            {
                return { ...item, text: newText };
            }
            return item;
        }));

        showToast("Item Updated ✏️");
    }

    function clearAll()
    {
        const confirmClear = window.confirm("Clear all items?");
        if (!confirmClear) return;

        setItems([]);
        showToast("All Cleared 🧹");
    }

    const sortedItems = [...items].sort(function(a, b)
    {
        const order = { High: 1, Medium: 2, Low: 3 };
        return order[a.priority] - order[b.priority];
    });

    const completedCount = items.filter(function(item)
    {
        return item.completed;
    }).length;

    const progress =
    items.length === 0
    ?
    0
    :
    (completedCount / items.length) * 100;

    return (
    (
        <div className={darkMode ? "app dark" : "app"}>

            <Header darkMode={darkMode} setDarkMode={setDarkMode} />

            <div className="container">

                <ItemForm addItem={addItem} />

                <div className="progress-bar">
                    <div style={{ width: progress + "%" }}></div>
                </div>

                <p className="stats">
                    {completedCount} / {items.length} Completed
                </p>

                {
                    sortedItems.length === 0
                    ?
                    <p className="empty">No items available</p>
                    :
                    <ItemList
                        items={sortedItems}
                        removeItem={removeItem}
                        toggleComplete={toggleComplete}
                        editItem={editItem}
                    />
                }

                <button className="clear-btn" onClick={clearAll}>
                    Clear All
                </button>

            </div>

            {
                toast && <div className="toast">{toast}</div>
            }

        </div>
    )
    );
}

export default App;