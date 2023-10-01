import React, { useState, useEffect} from 'react';
// import './ImageCarousel.css'; // Import your CSS file
import ProductImage from './ProductImage';
import DoublyLinkedList from '../classes/DoublyLinkedList';
import {fetchImages} from '../service/client';
import '../css/ImageCarousel.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ImageCarouselPreview from './ImageCarouselPreview';
import AddProductImage from './AddProductImage';
const ImageCarousel = (props) => {
    const [currentImage, setCurrentImage] = useState(null);
    const [imageList] = useState(new DoublyLinkedList());
    const productId = props.productId;
    const isOwner = props.isOwner;
    const [images, setImages] = useState([]);
    const [activeImageId, setActiveImageId] = useState(null);

    const handleNext = () => {
        if (imageList.getCurrentNext() === null) {
            console.log("current image is null");
            console.log(images)
        }
        else{
                
            imageList.next();
            setCurrentImage(imageList.getCurrent());
            setActiveImageId(imageList.getCurrent().id);
        }
    };

    const handlePrev = () => {
        if (imageList.getCurrentPrev() === null) {
            console.log("current image is null");
        }
        else{
            imageList.prev();
            setCurrentImage(imageList.getCurrent());
            setCurrentImage(imageList.getCurrent());
            setActiveImageId(imageList.getCurrent().id);
        }
    };


    //update the current image whenever the images state changes
    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const imagesData = await fetchImages(productId);
                console.log(imagesData);
                if (imagesData) {
                    setImages(imagesData);
                    if (imagesData.length > 0) {
                        for (let image of imagesData) {
                            imageList.append(image);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching images: ", error);
                // Handle the error here, e.g., display an error message to the user.
            }
        };
    
        fetchImageData(); // Call the async function
    }, [imageList, productId]);

    useEffect(() => {
        if(currentImage === null && images.length > 0){
            setCurrentImage(imageList.getCurrent());
        }
    },[currentImage, imageList, images]);

    useEffect(() => {
        setImages(imageList.getList());
    }, [imageList]);

    useEffect(() => {
        if(currentImage){
            setActiveImageId(currentImage.id);
        }
    }, [currentImage]);

    const handlePreviewClick = (imageId) => {
        imageList.findImageAndUpdateCurrent(imageId);
        setCurrentImage(imageList.getCurrent());
    }

    const handleImageDelete = () => {
        imageList.deleteCurrentImage();
        setCurrentImage(imageList.getCurrent());
        setImages(imageList.getList());
    }

    const addImage = (image) => {
        imageList.append(image);
        setCurrentImage(imageList.getCurrent());
        setImages([...images, image]);
    }

    const updateImages = (id, image) => {
        imageList.updateValue(id, image);
        setCurrentImage(imageList.getCurrent());
        setImages(imageList.getList());
    }

    return (
        <div>
            <div className='carousel'>
                {currentImage ? (
                <div className="image-carousel">
                
                <ArrowBackIosNewIcon className="prev-button" onClick={handlePrev}/>
                <ProductImage
                    key={currentImage.id}
                    id={currentImage.id}
                    productId={productId}
                    isOwner={isOwner}
                    image={currentImage.image}
                    handleImageDelete={handleImageDelete}
                    updateImages={updateImages}
                />
                    
                <ArrowForwardIosIcon className="next-button" onClick={handleNext}/>
                
                </div>
                ):
                <h5>No images</h5>
                }
            
                <ImageCarouselPreview 
                    handlePreviewClick = {handlePreviewClick} 
                    images = {images} 
                    deletedImageId={currentImage ? currentImage.id : null}
                    activeImageId={activeImageId}/>

                
                
            </div>

            {
                isOwner && (
                    <AddProductImage productId = {productId} addImage={addImage}/>
                )
            }

        </div>
    );
};

export default ImageCarousel;