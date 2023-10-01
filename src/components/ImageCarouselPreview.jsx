import React, { useEffect } from "react";
import "../css/ImageCarouselPreview.scss";

function ImageCarouselPreview(props) {
    const [activeImages, setActiveImages] = React.useState({});
    const images = props.images;
 
    

    const handleClick = (id) => {
        props.handlePreviewClick(id);
        setActiveImages({});
        // Toggle the active state for the clicked image
        setActiveImages((prevState) => ({
            ...prevState,
            [id]: !prevState[id] || false,
        }));

        // Update the active image in the parent component
        

    };

    useEffect(() => {
        // Set the first image as active by default
        if (images && images.length > 0) {
            setActiveImages((prevState) => ({
                ...prevState,
                [images[0].id]: true,
            }));
        }

        props.activeImageId && setActiveImages({ [props.activeImageId]: true });

        

    }, [images, props.activeImageId]);



    return (
        <div className="image-carousel-preview">
            {images &&
                images.map((image) => (
                    <img
                        key={image.id}
                        className={`image-preview ${
                            activeImages[image.id] ? "active-image-preview" : ""
                        }`}
                        src={`data:image/jpeg;base64,${image.image}`}
                        alt="img"
                        onClick={() => handleClick(image.id)}
                    />
                ))}
        </div>
    );
}

export default ImageCarouselPreview;
