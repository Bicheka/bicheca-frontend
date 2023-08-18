import React from "react";
import "../css/Comment.css";

function Comment(props) {

    const createdAt = new Date(props.createdAt);
    const lastUpdated = new Date(props.lastUpdated);

    return (
        <div className="comment">
            <p>Created by: {props.createdBy}</p>
            <p>"{props.commentText}"</p>
            <p>created at: {createdAt.toLocaleString()}</p>
            {
                createdAt.getTime() !== lastUpdated.getTime() &&
                <p>last updated: {lastUpdated.toLocaleString()}</p>
            }
        </div>
    );
}

export default Comment;