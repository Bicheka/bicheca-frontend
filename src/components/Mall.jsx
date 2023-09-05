import axios from "axios";
import React, { useEffect, useState } from "react";
import Store from "./Store";
import "../css/Mall.css";

function Mall() {

    const [stores, setStores] = useState([]);
 


    
    useEffect(() => {
        const fetchStores = async () => {
            try{
                const response = await axios.get('https://bicheka-server-pyqmlkxaxq-ue.a.run.app/store/get_all_stores');
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
                <h1>Mall</h1>
                <div className="mall">
                    {stores.map(store => (
                        <Store key={store.id} id={store.id} name={store.storeName}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Mall;