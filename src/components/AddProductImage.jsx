import React, { useEffect, useRef, useState } from "react";
import styles from "../css/AddImageButton.module.scss"
import { upload_product_image } from "../service/client";
import { useSelector } from "react-redux";

function AddProductImage(props) {

    const token = useSelector(state => state.jwt.jwt);
    const [selectedImage, setSelectedImage] = useState(null); //selected file from input[type=file
    const fileInputRef = useRef(null);

    const [data, setData] = useState(null); //selected file from input[type=file

    const {addImage} = props;

    const handleUploadClick = () => {
        // Trigger the click event on the hidden file input element
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
    };

    const handleImageChange = (e) => {
        console.log("inside handleImageChange");
        setSelectedImage(e.target.files[0]);
        console.log(e.target)
    }

    useEffect(() => {
        const uploadImage = async () => {
            if (selectedImage) {
                const formData = new FormData();
                formData.append("file", selectedImage);
                const response = await upload_product_image(props.productId, token, formData);
                console.log("response: ", response);
                setData(response.data);                
            }
        }

        uploadImage();
        
    }, [selectedImage, props.productId, token]);


    useEffect(() => {
        if (data) {
            addImage(data);
        }

        // if addImage is added to the dependency array, it will cause an infinite loop

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    

    return (
        <div>
            <button className={styles.btn} onClick={handleUploadClick}>Select and Upload File</button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
         </div>
    );
}

export default AddProductImage;