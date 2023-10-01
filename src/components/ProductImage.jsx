import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styles from '../css/ProductImage.module.scss'
import {changeImageRequest, removeImageRequest} from '../service/client';



function ProductImage(props) {

    const [isHovered, setIsHovered] = useState(false);
    const [isChangingImage, setIsChangingImage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); //selected file from input[type=file
    const [isFormActive, setIsFormActive] = useState(false); //selected file from input[type=file
    const [image, setImage] = useState(null); //selected file from input[type=file
    const updateImages = props.updateImages;
    const handleImageDelete = props.handleImageDelete;
    
    const location = useLocation();

    const currentLocation = location.pathname.split("/")[1];

    // const token = useSelector(state => state.jwt.jwt);
    const token = localStorage.getItem('token');

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const handleImageChangeButton = () => {
        setIsFormActive(!isFormActive);
        setIsChangingImage(!isChangingImage);
    }

    const handleImageUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);

        const updatedImage = await changeImageRequest(props.productId, props.id, token, formData);

        setImage(updatedImage);
        
        setIsFormActive(false);
        setIsChangingImage(false);

        updateImages(props.id, updatedImage);
    }

    const handleImageRemove = async () => {
        await removeImageRequest(props.productId, props.id, token).then
        (() => console.log("image removed"));
        //update so it doesn't show the image anymore
        setIsFormActive(false);
        setIsChangingImage(false);
        //update the images in the parent component
        handleImageDelete()
    }

    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    useEffect(() => {
        setImage(props.image);
    }, [props.image]);

    return (
        <div className={styles.productImgDiv} onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
            {(props.isOwner && (isHovered || isFormActive) && currentLocation === "admin-product-details")  ? 
            
                <div>
                    <button onClick={handleImageChangeButton}>Change Image</button>
                    {isChangingImage && 
                        
                        <form>
                            <label>Select Image</label>
                            <input type="file" onChange={handleImageChange} />
                            <button onClick={handleImageUpdate}>update</button>
                        </form>                    
                    }
                    <button onClick={handleImageRemove} >Remove Image</button>
                </div>
            :

                <img className={styles.img} src={`data:image/jpeg;base64,${image}`} alt="img" />
                
            }
        </div>
    );
}

export default ProductImage;