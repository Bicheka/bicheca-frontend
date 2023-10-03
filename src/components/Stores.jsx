import axios from "axios";
import React, { useEffect, useState } from "react";
import Store from "./Store";
import "../css/Mall.css";
import { API_URL } from "./global/GlobalConsts";


function Stores() {

    const [stores, setStores] = useState([]);
 


    
    useEffect(() => {
        const fetchStores = async () => {
            try{
                //load balance ip
                const response = await axios.get(API_URL+'/store/get_all_stores');
                setStores(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStores();
    }, []);


    return (
        <div>
            <div>
                <h1>Stores</h1>
                <div className="mall">
                    {stores.map(store => (
                        <Store key={store.id} id={store.id} name={store.storeName}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Stores;