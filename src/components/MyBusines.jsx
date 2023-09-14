import React, { useEffect, useState } from "react";
import Store from "./Store";
import '../css/MyBusiness.css';
import {getUserStores} from '../service/client';
import { useSelector } from "react-redux";

function MyBusines() {

  // const jwt = useSelector(state => state.jwt.jwt);
  const jwt = useSelector(state => state.jwt.jwt);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    
    const fetchUserStores = async () => {
      setStores(await getUserStores(jwt));
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