import React, { useEffect, useState } from "react";
import GoBackButton from "./GoBackButton";
import axios from "axios";
import { useLocation } from "react-router";
import Product from "./Product";
import { useSelector } from "react-redux";
import { API_URL } from "./global/GlobalConsts"
import "../css/Products.scss";

function StoreDetails() {

    const [storeName, setStoreName] = useState("");
    const [products, setProducts] = useState([]);
    const token = useSelector(state => state.jwt.jwt);
    const location = useLocation();

    const id = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchProducts = async () => {
            try{

                const response = await axios.get(
                    API_URL+`/store/get_store/${id}`,
                    {},//request body
                    {
                      headers: {
                        Authorization: token,
                      },
                    }
                );

                console.log(response);
                console.log(response.data.products);
                setProducts(response.data.products)
                setStoreName(response.data.storeName);
                // console.log(response);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProducts();
        
    }, [id, token]);


    return (
        <div>
            <h1>{storeName + " products"}</h1>
            <div className="products">
                    {products.map(product => (
                        <Product 
                            key={product.id} 
                            product = {product} 
                            id={product.id} 
                            name={product.name} 
                            price={product.price} 
                            description={product.description} 
                            imageIds = {product.imageIds}
                        />
                    ))}
                </div>
            <GoBackButton/>
        </div>
    );
}

export default StoreDetails;