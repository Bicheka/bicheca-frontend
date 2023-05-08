import React, { useEffect, useState } from "react";
import GoBackButton from "./GoBackButton";
import axios from "axios";
import { useLocation } from "react-router";
import Product from "./Product";

function StoreDetails() {

    const [storeName, setStoreName] = useState("");
    const [products, setProducts] = useState([]);

    const location = useLocation();

    const id = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/store/get_store/${id}`);
                setProducts(response.data.products)
                setStoreName(response.data.storeName);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchProducts();
        
    }, [id]);


    return (
        <div>
            <h1>{storeName + " products"}</h1>
            <div className="mall">
                    {products.map(product => (
                        <Product key={product.id} id={product.id} name={product.name} price={product.price} description={product.description} />
                    ))}
                </div>
            <GoBackButton/>
        </div>
    );
}

export default StoreDetails;