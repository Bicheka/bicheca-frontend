import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import '../css/Cart.css';

function Cart() {

    const isLogged = useSelector(state => state.login.isLogged);
    const jwt = useSelector(state => state.jwt.jwt);
    const [total, setTotal] = useState("0");
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            if(isLogged){
                try{
                    const response = await axios.get('http://localhost:8080/cart/get-cart', 
                    {
                        headers: {
                            Authorization: jwt,
                        }
                    });
                    setCart(response.data);
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }
            else{
                console.log("not logged in");
            }
        }

        
        fetchProducts();
        


    }, [isLogged, jwt]);

    function removeFromCart(id) {
        setCart(cart.filter((item) => item.product.id !== id));
    }

    function updateQuantity(id, quantity) {
        const newCart = cart.map(item => {
            if (item.product.id === id) {
                return {
                    ...item,
                    quantity: quantity
                };
            }
            return item;
        });
        setCart(newCart);
        calculateTotal(newCart);
    }

    function calculateTotal(cartItems) {
        let total = 0;
        if(cart.length !== 0){
                cartItems.forEach(item => {
                total += item.product.price * item.quantity;
            });
        }
        setTotal(total.toLocaleString("en-US", {maximumFractionDigits: 2}));
    }

    useEffect(() => {
        calculateTotal(cart);
    });

    return (
        <div className="cart">
            <h1 className="pageTitle">Cart</h1>
            <h2 className="total">Total: ${total}</h2>
            { cart.length === 0 
                ? <h2 className="empty">Your cart is empty</h2>
                : <div className="cartItems">
                    {cart.map(item => (
                        <CartItem 
                            key={item.product.id} 
                            id={item.product.id} 
                            name={item.product.name} 
                            price={item.product.price} 
                            quantity={item.quantity} 
                            onRemove={removeFromCart} 
                            onUpdateQuantity={updateQuantity} 
                            imageIds = {item.product.imageIds}  
                        />
                    ))}
                </div>
            }
        </div>
    );
}

export default Cart;