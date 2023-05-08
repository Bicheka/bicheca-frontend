import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Store from "./Store";
import '../css/MyBusiness.css';

function MyBusines() {

  const jwt = useSelector(state => state.jwt.jwt);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    console.log("jwt", jwt);
    const fetchUserStores = async () => {
      try {
        const response = await axios.get('http://localhost:8080/store/get_user_stores', 
                    {
                        headers: {
                            Authorization: jwt,
                        }
                    });
        console.log("response", response);
        setStores(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUserStores();
  }, [jwt]);

  return (
    <div>
      <div>
        <h1>My Stores</h1>
        <div className="userStores">
            {stores.map(store => (
                <Store key={store.id} email = {store.userEmail} id={store.id} name={store.storeName}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyBusines;