import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Store from "./Store";


function MyBusines() {

  const jwt = useSelector(state => state.jwt.jwt);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchUserStores = async () => {
      try {
        const response = await axios.get("http://localhost:8080/store/get_user_stores", {
          headers: {
            Authorization: jwt,
            },
        });
        setStores(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUserStores();
  }, [jwt]);

  return (
    <div>
      <h1>My Stores</h1>
      {stores.map(store => product => (
        <Store key={store.id} id={store.id} name={store.storeName}/>
        
      ))}
    </div>
  );
}

export default MyBusines;