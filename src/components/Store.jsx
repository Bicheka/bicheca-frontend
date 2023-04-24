import React from "react";
import "../css/Store.css";

function Store(props) {

    function handleClick() {
        props.onClick(props.id, props.name);
    }
    
    return (
        <div onClick={handleClick} className="store">
            <h3 className="storeName">{props.name}</h3>
        </div>
    );
}

export default Store;