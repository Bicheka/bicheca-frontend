import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Store.css";
import { useSelector } from "react-redux";

function Store(props)
{

    const location = useLocation();
    
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState('');

    const userInfo = useSelector(state => state.userInfo.userInfo);

    useEffect(() => {
        if(userInfo){
            setEmail(userInfo.email);
            setUserRole(userInfo.role);
        }
    }, [userInfo]);

    return(
        <div>
            {/* if the user is on the myBusines page, the store name will be a link to the store details page */}
            {
                location.pathname === "/mybusines" && email === props.email && userRole === "STORE" ? 
                (
                    <Link className="link" to={`/admin-store/${props.id}`}>

                        <div className="store">
                            <h1 className="storeName">{props.name}</h1>
                        </div>
                    
                    </Link>
                ) 
                : 
                (
                    <Link className="link" to={`/store-details/${props.id}`}>
                        <div className="store">
                            <h1 className="storeName">{props.name}</h1>
                        </div>
                    </Link>
                )
            }
        </div>
    );
}

export default Store;