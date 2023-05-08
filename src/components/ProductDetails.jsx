import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import GoBackButton from "./GoBackButton";
import Comments from "./Comments";

function ProductDetails() {

    const location = useLocation();
    console.log(location);
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    

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
        
        fetchProduct();
        

    }, [id]);

    return (
        <div className="productDetails">
            <h1>Product Details</h1>
            <h2>{product.name}</h2>
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