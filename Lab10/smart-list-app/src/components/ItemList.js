import React from "react";
import Item from "./Item";

function ItemList(props)
{
    return (
    (
        <div className="list">
            {
                props.items.map(function(item)
                {
                    return (
                    (
                        <Item
                            key={item.id}
                            item={item}
                            removeItem={props.removeItem}
                            toggleComplete={props.toggleComplete}
                            editItem={props.editItem}
                        />
                    )
                    );
                })
            }
        </div>
    )
    );
}

export default ItemList;