import React, { useEffect, useState } from "react";
import GoBackButton from "./GoBackButton";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import Product from "./Product";
import { API_URL } from "./global/GlobalConsts"
function AdminStore() {

    const [storeName, setStoreName] = useState("");
    const [products, setProducts] = useState([]);


    const navigate = useNavigate();
    const location = useLocation();

    const storeId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await axios.get(API_URL+`/store/get_store/${storeId}`);
                setProducts(response.data.products)
                setStoreName(response.data.storeName);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchProducts();

    }, [storeId]);


    const handleAddProductButton = async () => {
        navigate(`/create-product/${storeId}`);
    }

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
      }
    return (
        <div>
            <h1>{"Admin " + storeName + " products"}</h1>

            <button className="btn btn-primary" onClick={handleAddProductButton}>Add Product</button>
            
            <GoBackButton/>

            <div className="products">
                {products.map(product => (
                    <Product 
                        key={product.id} 
                        id={product.id} 
                        name={product.name} 
                        price={product.price} 
                        description={product.description}
                        imageIds = {product.imageIds}
                        onDelete={handleDeleteProduct} 
                        isOnAdminStore={true}
                    />
                ))}
            </div>
        </div>
    );
}

export default AdminStore;