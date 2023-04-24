import axios from "axios";
import React, { useEffect, useState } from "react";
import Store from "./Store";
import "../css/Mall.css";
import Product from "./Product";

function Mall() {

    const [stores, setStores] = useState([]);
    const [clickedStore, setClickedStore] = useState(false);
    const [thisStoreName, setThisStoreName] = useState('');
    const [thisStoreProducts, setThisStoreProducts] = useState([]);

    
    useEffect(() => {
        const fetchStores = async () => {
            try{
                const response = await axios.get('http://localhost:8080/store/get_all_stores');
                setStores(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStores();
    }, []);

    const handleClickedStore = async (id, storeName) => {
        const store = await stores.find(store => store.id === id);
        console.log(store.products)
        setThisStoreProducts(store.products)
        setClickedStore(true);
        setThisStoreName(storeName);
    }

    return (
        <div>
            {   !clickedStore ?
                <div>
                    <h1>Mall</h1>
                    <div className="mall">
                        {stores.map(store => (
                            <Store key={store.id} id={store.id} name={store.storeName} onClick={handleClickedStore}/>
                        ))}
                    </div>
                </div>
                :
                <div>
                   <h1>{thisStoreName + " products"}</h1>
                   <div className="mall">
                        {thisStoreProducts.map(product => (
                            <Product key={product.id} id={product.id} name={product.name} price={product.price} description={product.description} />
                        ))}
                    </div>
                    <button onClick={() => setClickedStore(false)}>Back</button>
                </div>
            }
        </div>
    );
}

export default Mall;