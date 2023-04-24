import React, { useEffect, useState } from "react";
import "../css/Product.css"; 
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

function Product(props) {

    // const navigate = useNavigate();

    const isLogged = useSelector(state => state.login.isLogged);
    const [token, setToken] = useState('');
    const [logged , setLogged] = useState(false);
    const jwt = useSelector(state => state.jwt.jwt);

    useEffect(() => {
        if(jwt){
            setToken(jwt);
        }
        if(isLogged){
            setLogged(true);
        }
    }, [isLogged, jwt]);

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
                    <button onClick={addToCart} className="addToCartButton"><AddShoppingCartIcon/></button>
                </div>
            </div>
       
    );
}

export default Product;