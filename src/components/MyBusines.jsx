import React, { useEffect, useState } from "react";
import Store from "./Store";
import '../css/MyBusiness.css';
import { useSelector } from "react-redux";

function MyBusines() {

  const user = useSelector(state => state.userInfo.userInfo);
  const [stores, setStores] = useState([]);
  useEffect(() => {
    if (user && user.stores) {
      setStores(user.stores);
    }
  }, [user])
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