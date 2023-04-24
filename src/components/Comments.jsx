import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import "../css/Comments.css";

function Comments(props) {

    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/comment/get-comments/${props.id}`);
                setCommentList(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }

        }

        fetchComments();

    }, [props.id]);

    return (
        <div className="comments">
            <h1>Comments</h1>
            {commentList.map(comment => (
                <Comment key={comment.id} createdBy={comment.createdBy} commentText={comment.commentText} createdAt={comment.createdAt} lastUpdated={comment.lastUpdated}/>
            ))}
        </div>
    );
}

export default Comments;