import React, { useEffect, useState } from "react";
import { createComment } from "../service/client";
import { useSelector } from "react-redux";

const AddCommentForm = (props) => {

    const [comment, setComment] = useState("");
    const token = useSelector(state => state.jwt.jwt);
    const userInfo = useSelector(state => state.userInfo.userInfo);
    const createdBy = userInfo.email;

    const { commentAdded, setIsAddingComment } = props;

    const handleChange = (event) => {
        setComment(event.target.value);
    }

    useEffect(() => {
        
    }, [userInfo]);

    const handleSubmit = (event) => {
        event.preventDefault();
        createComment(props.productId, token, comment, createdBy)
            .then(response => {
                console.log("response from createComment: ");
                console.log(response);
                commentAdded(response.data);
            })
        setIsAddingComment(false);
    }

    const handleCancel = (event) => {
        event.preventDefault();
        setIsAddingComment(false);
    }

    return(
        <div>
            <form>
                <label htmlFor="comment">Type your comment</label>
                <div>
                    <textarea name="comment" onChange={handleChange} value={comment} rows="5" cols="50"></textarea>
                </div>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSubmit}>Submit</button>      
            </form>
        </div>
    )
}

export default AddCommentForm;