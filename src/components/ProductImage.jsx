import React, { useEffect, useState } from 'react';
import styles from '../css/ProductImage.module.scss'
import {changeImageRequest, removeImageRequest} from '../service/client';
function ProductImage(props) {

    const [isHovered, setIsHovered] = useState(false);
    const [isChangingImage, setIsChangingImage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); //selected file from input[type=file
    const [isFormActive, setIsFormActive] = useState(false); //selected file from input[type=file
    const [image, setImage] = useState(null); //selected file from input[type=file

    const {updateImages} = props;

    // const token = useSelector(state => state.jwt.jwt);
    const token = localStorage.getItem('token');

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const handleImageChangeButton = () => {
        setIsFormActive(true);
        setIsChangingImage(true);
    }

    const handleImageUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);

        const updatedImage = await changeImageRequest(props.productId, props.id, token, formData);
        setImage(updatedImage);
        setIsFormActive(false);
        setIsChangingImage(false);
    }

    const handleImageRemove = async () => {
        await removeImageRequest(props.productId, props.id, token).then
        (() => console.log("image removed"));
        //update so it doesn't show the image anymore
        setIsFormActive(false);
        setIsChangingImage(false);
        //update the images in the parent component
        updateImages(props.id);
    }

    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    useEffect(() => {
        setImage(props.image);
    }, [props.image]);

    return (
        <div className={styles.productImgDiv} onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
            {(props.isOwner && (isHovered || isFormActive)) ? 
            
                <div>
                    <button onClick={handleImageChangeButton}>Change Image</button>
                    {isChangingImage && 
                        
                        <form>
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