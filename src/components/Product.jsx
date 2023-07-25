import React, { useEffect, useState } from "react";
import "../css/Product.css";

//icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Product(props) {

    // const navigate = useNavigate();

    const isLogged = useSelector(state => state.login.isLogged);
    const [token, setToken] = useState('');
    const [logged , setLogged] = useState(false);
    const jwt = useSelector(state => state.jwt.jwt);
    const userInfo = useSelector(state => state.userInfo.userInfo);
    const location = useLocation();

    const [role, setRole] = useState('');
    const currentLocation = location.pathname.split("/")[1];

    useEffect(() => {
        if(userInfo){
            setRole(userInfo.role);
        }
        if(jwt){
            setToken(jwt);
        }
        if(isLogged){
            setLogged(true);
        }
        
    }, [userInfo, isLogged, jwt]);

    async function addToCart(){
        if(logged){
            try{
                await axios.patch(
                    `http://localhost:8080/cart/add-product-to-cart/${props.id}`,
                    {},//request body
                    {
                      headers: {
                        Authorization: token,
                      },
                    }
                );
                
            }catch(error){
                console.log(error);
            }
        }else{
            console.log("not logged in");
        }
    }

    const handleDelete = async () => {
        console.log(props.id);
        try{
            await axios.delete(
                `http://localhost:8080/product/delete_product/${props.id}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            props.onDelete(props.id);
        }catch(error){
            console.log(error);
        }
        
    }

    return (
            <div className="product">
                <Link to={`/product-details/${props.id}`}>
                    <div className="productImg">
                            <div>
                                <img src="" alt="ProductImg"/>
                            </div>                        
                    </div>
                </Link>

                <div className="productFooter">
                    <div className="productInfo">
                        <p className="productName">{props.name}</p>
                        <p className="productPrice">${props.price}</p>   
                    </div>
                    {currentLocation === "admin-store" && role === "STORE" ? 
                        (
                            <button onClick={handleDelete} className="deleteProductButton"><DeleteIcon/></button>
                        )
                        : 
                        (
                            <button onClick={addToCart} className="addToCartButton"><AddShoppingCartIcon/></button>
                        )
                    }
                </div>
            </div>
       
    );
}

export default Product;