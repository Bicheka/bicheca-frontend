import React, { useState } from 'react';
import { BrowserRouter, Link , Routes, Route, useLocation} from "react-router-dom";

//css
import '../css/NavBar.css';

//components
// import Account from './Account';
import Home from './Home';
import Stores from './Stores';
import Products from './Products';
import Account from './Account';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';

//icons
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/StoreMallDirectory';
import ProductIcon from '@mui/icons-material/Category';
import LoginIcon from '@mui/icons-material/Login';

// import { useSelector } from 'react-redux';



function NavBar(){

    //active button
    const [activeButton, setActiveButton] = useState('');
    const [islogged , setIsLogged] = useState(false);

    const handleActiveButton = (button) => {
        setActiveButton(button);
    }


    return (
        <BrowserRouter forceRefresh = {true}>
            <div className="navBar">
                <div className="navBarItem">
                    
                        <Link 
                            to = "/"
                            className={`navBarButton ${activeButton === 'home' ? 'active' : ''}`}
                            onClick = {() => handleActiveButton('home')}
                        >
                            <HomeIcon/>
                            <p>Home</p>
                        </Link>
                    
                </div>
                <div className="navBarItem">
                    
                        <Link 
                            to = "/stores" 
                            className={`navBarButton ${activeButton === 'stores' ? 'active' : ''}`}
                            onClick = {() => handleActiveButton('stores')}
                        >
                            <StoreIcon className = "storeIcon" />
                            <p>stores</p>
                        </Link>
                    
                </div>
                <div className="navBarItem">
                    
                        <Link 
                            to = "/products" 
                            className={`navBarButton ${activeButton === 'products' ? 'active' : ''}`}
                            onClick = {() => handleActiveButton('products')}
                        >
                            <ProductIcon className = "productIcon" />
                            <p>Products</p>
                        </Link>
                    
                </div>
                <div className="navBarItem">
                    
                    <Link 
                        to = "/cart" 
                        className={`navBarButton ${activeButton === 'cart' ? 'active' : ''}`}
                        onClick = {() => handleActiveButton('cart')}
                    >
                        <ShoppingCartIcon className = "cartIcon" />
                        <p>Cart</p>
                    </Link>
                    
                </div>
                <div className="navBarItem">
                    
                        {islogged ?
                
                            <Link 
                            to = "/account" 
                            className={`navBarButton ${activeButton === 'account' ? 'active' : ''}`}
                            onClick = {() => handleActiveButton('account')}
                        >
                            <PersonIcon className = "accountIcon" />
                            <p>Account</p>
                            </Link> 
                            : //if not logged in show login button
                            <div className="navBarItem">
                                <Link
                                    to = "/login"
                                    className={`navBarButton ${activeButton === 'login' ? 'active' : ''}`}
                                    onClick = {() => handleActiveButton('login')}
                                >
                                    <LoginIcon className = "loginIcon" />
                                    <p>Login/SignUp</p>
                                </Link>
                            </div>
                        }
                
                </div>
                
            </div>
            <Routes>
                <Route exact path='/' element = {<Home/>}/>
                <Route exact path='/stores' element={<Stores/>}/>
                <Route exact path='/products' element={<Products/>}/>
                <Route exact path='/cart' element={<Cart/>}/>
                <Route exact path='/account' element={<Account/>}/>
                <Route exact path='/login' element={<Login setIsLogged = {setIsLogged} />}/>
                <Route exact path='/register' element={<Register/>}/>
            </Routes>
        </BrowserRouter>
        
    );
}

export default NavBar;