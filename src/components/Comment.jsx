import React from "react";
import "../css/Comment.css";

function Comment(props) {

    const createdAt = new Date(props.createdAt);
    const lastUpdated = new Date(props.lastUpdated);

    return (
        <div className="comment">
            <p className="commentField">Created by: {props.createdBy}</p>
            <p className="commentField">"{props.commentText}"</p>
            <p className="commentField">created at: {createdAt.toLocaleString()}</p>
            {
                createdAt.getTime() !== lastUpdated.getTime() &&
                <p className="commentField">last updated: {lastUpdated.toLocaleString()}</p>
            }
        </div>
    );
}

export default Comment;