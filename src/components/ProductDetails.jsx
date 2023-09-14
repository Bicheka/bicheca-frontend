import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import GoBackButton from "./GoBackButton";
import Comments from "./Comments";
import style from "../css/ProductDetails.module.scss"
import ProductImage from "./ProductImage";
import { useSelector } from "react-redux";
import FormatedDate from "./FormatedDate";
import { API_URL } from "./global/GlobalConsts"

function ProductDetails(props) {

    const location = useLocation();
    console.log(location);
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const user = useSelector(state => state.userInfo.userInfo);

    useEffect(() => {

        

        const fetchProduct = async () => {
            try{
                const response = await axios.get(API_URL+`/product/get_product_by_id/${id}`);
                setProduct(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }

        }
        
        const fetchImages = async () => {
            
            try{
                const response = await axios.get(`http://localhost:8080/image/${id}/get_product_images`);
                setImages(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchImages();

        fetchProduct();

    }, [id]);

    useEffect(() => {
        if(user){
            if(user.email === product.ownerEmail){
                setIsOwner(true);
            }
        }

    }, [user, product, location]);

    //method to update images whenerver an image is deleted based in its index
    const updateImages = (id) => {
        const newImages = images.filter((image) => image.id !== id);
        setImages(newImages);
    }

    //re render images whenever images state changes
    useEffect(() => {
        console.log(images);
    }, [images]);

    return (
        <div className="productDetails">
            <h1>Product Details</h1>
            <h2>{product.name}</h2>
            
            <div className={style.productImages}>

                {images.map((image) => (
                    <ProductImage
                        key={image.id}
                        id={image.id}
                        productId={id}
                        isOwner={isOwner}
                        image={image.image}
                        updateImages={updateImages}
                    />
                ))}
            </div>
            <p>${product.price}</p>    
            <p>Created at: </p>
            <FormatedDate date={product.dateAdded}/>
            <p>Category: {product.category}</p>
            <hr className={style.hr}/>
            <p className={style.description}>{product.description}</p>
            
            <button>Add to Cart</button>
            <button>Buy Now</button>
            
            <GoBackButton/>
            
            <Comments id={id} ownerEmail={product.ownerEmail}/>

        </div>
    );
}

export default ProductDetails;