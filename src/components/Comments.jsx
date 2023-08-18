import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import "../css/Comments.css";
import AddCommentForm from "./AddCommentForm";
import { useSelector } from "react-redux";
function Comments(props) {

    const [commentList, setCommentList] = useState([]);
    const [isAddingComment, setIsAddingComment] = useState(false);
    const userInfo = useSelector(state => state.userInfo.userInfo);
    const [isOwner, setIsOwner] = useState(false);
    const isLogged = useSelector(state => state.login.isLogged);

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

    const addComment = async () => {
        setIsAddingComment(true);
    }

    const commentAdded = (comment) => {
        //add the new comment to the comment list
        setCommentList([...commentList, comment]);
    }


    useEffect(() => {
        if(userInfo){
            if(userInfo.email === props.ownerEmail){
                setIsOwner(true);
            }
        }

    }, [userInfo, props.ownerEmail]);

    //to be able to add a comment, 
    //the user must be logged in and not the owner of the product 
    //otherwise the button is disabled

    return (
        <div className="comments">
            <h1>Comments</h1>
            {
                (!props.addCommentDisabled && isLogged && !isOwner) ? 
                <button onClick={addComment}>Add comment</button>
            :
                <button disabled>Add comment</button>
            }
            {
                isAddingComment && <AddCommentForm setIsAddingComment={setIsAddingComment} commentAdded={commentAdded} productId={props.id}/>
            }
            {commentList.map(comment => (
                <Comment key={comment.id} createdBy={comment.createdBy} commentText={comment.commentText} createdAt={comment.createdAt} lastUpdated={comment.lastUpdated}/>
            ))}
        </div>
    );
}

export default Comments;