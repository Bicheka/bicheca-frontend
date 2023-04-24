import React, { useEffect, useState } from "react";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import axios from "axios";
import { useSelector } from "react-redux";
import "../css/Cart.css"
import { Link } from "react-router-dom";

function CartItem(props) {

    const jwt = useSelector(state => state.jwt.jwt);

    const [token, setToken] = useState('');
    const [quantity, setQuantity] = useState(props.quantity);


    useEffect(() => {
        setToken(jwt);
    }, [jwt]);

    async function removeFromCart() {
        
        if(token){
            try{
                await axios.patch(
                    `http://localhost:8080/cart/remove-from-cart/${props.id}`,
                    {},//request body
                    {
                      headers: {
                        Authorization: token,
                      },
                    }
                );

                props.onRemove(props.id);
                
            }catch(error){
                console.log(error);
            }
        }else{
            console.log("not logged in");
        }
    }

    const handleQuantityChange = async (event) => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity);
        props.onUpdateQuantity(props.id, event.target.value);

        if(newQuantity <= 0 || newQuantity===null){
            removeFromCart();
        }

        let data = JSON.stringify(newQuantity); //it has to  be new quantity instead of quantity because quantity will still be the old value

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/cart/update-product-quantity/${props.id}`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': token
            },
            data : data
        };

        axios.request(config).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <div className="cartItem">
            <Link to={`/product-details/${props.id}`}>
                <div className="cartItemImg">
                    <img src="" alt="ProductImg"/>
                </div>
            </Link>
            <div className="cartItemInfo">
                <div className="productFooter">
                    <div className="productInfo">
                        <p className="productName">{props.name}</p>
                        <p className="productPrice">${props.price}</p>   
                    </div>
                    <button onClick={removeFromCart} className="removeFromCartButton"><RemoveShoppingCartIcon/></button>
                </div>
                <div className="quantity">
                    <label className="cartItemQuantityLabel">qty:</label>
                    <select className="cartItemQuantitySelect" defaultValue={quantity} onChange={handleQuantityChange} name="option">
                        <option value="0">0 (delete)</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
    
                </div>
            </div>
        </div>
    );
}

export default CartItem;