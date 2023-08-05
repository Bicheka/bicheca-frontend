import React, { useEffect, useState } from "react";
import Store from "./Store";
import '../css/MyBusiness.css';
import {getUserStores} from '../service/client';

function MyBusines() {

  // const jwt = useSelector(state => state.jwt.jwt);
  const token = localStorage.getItem('token');
  const [stores, setStores] = useState([]);

  useEffect(() => {
    console.log("token: ", token);
    const fetchUserStores = async () => {
      setStores(await getUserStores(token));
    };
    fetchUserStores();
  }, [token]);

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