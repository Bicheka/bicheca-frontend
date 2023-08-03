import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import GoBackButton from "./GoBackButton";
import Comments from "./Comments";
import "../css/ProductDetails.css";

function ProductDetails() {

    const location = useLocation();
    console.log(location);
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);

    useEffect(() => {

        const fetchProduct = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/product/get_product_by_id/${id}`);
                setProduct(response.data);
                console.log(response);
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

    return (
        <div className="productDetails">
            <h1>Product Details</h1>
            <h2>{product.name}</h2>
            {/* lists all the images of the product */}
            <div className="productImages">
                {images.map((image, index) => (
                <div key={index}>  
                    <img
                        className="product-details-img"
                        src={`data:image/jpeg;base64,${image}`}
                        alt="product"
        
                    />    
                </div>
            ))}
      </div>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <p>{product.dateAdded}</p>
            <p>{product.category}</p>
            <GoBackButton/>
            
            <Comments id={id}/>

        </div>
    );
}

export default ProductDetails;