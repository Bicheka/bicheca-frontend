import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link , Routes, Route} from "react-router-dom";

//css
import '../css/NavBar.css';

//components
// import Account from './Account';
import Mall from './Mall';
import Products from './Products';
import Account from './Account';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
import MyBusines from './MyBusines';
import ProductDetails from './ProductDetails';

//icons
import MallIcon from '@mui/icons-material/StoreMallDirectory';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductIcon from '@mui/icons-material/Category';
import LoginIcon from '@mui/icons-material/Login';
import { useSelector } from 'react-redux';
import WorkIcon from '@mui/icons-material/Work';
// import { useSelector } from 'react-redux';


function NavBar(){

    const userInfo = useSelector(state => state.userInfo.userInfo);

    //active button
    const [activeButton, setActiveButton] = useState('');
    const [islogged , setIsLogged] = useState(false);
    const[isStore , setIsStore] = useState(false);

    const handleActiveButton = (button) => {
        setActiveButton(button);
    }

    useEffect(() => {
        if(userInfo){
            if(userInfo.role === 'STORE'){
                setIsStore(true);
            }
        }
    }, [userInfo]);

    return (
        <BrowserRouter forceRefresh = {true}>
            <div className="navBar">
                <div className="navBarItem">
                    
                        <Link 
                            to = "/"
                            className={`navBarButton ${activeButton === 'mall' ? 'active' : ''}`}
                            onClick = {() => handleActiveButton('mall')}
                        >
                            <MallIcon className = "mallIcon" />
                            <p>Mall</p>
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
            
                    <div className="navBarItem">
                    
                        {isStore &&
                            <Link 
                                to = "/mybusines"
                                className={`navBarButton ${activeButton === 'mybusines' ? 'active' : ''}`}
                                onClick = {() => handleActiveButton('mybusines')}
                            >
                                <WorkIcon className = "mybusinesIcon" />
                                <p>Mall</p>
                            </Link>
                        }
                    </div>
            
                
            </div>
            <Routes>
                <Route exact path='/' element = {<Mall/>}/>
                <Route exact path='/products' element={<Products/>}/>
                <Route exact path='/cart' element={<Cart/>}/>
                <Route exact path='/account' element={<Account/>}/>
                <Route exact path='/login' element={<Login setIsLogged = {setIsLogged} />}/>
                <Route exact path='/register' element={<Register/>}/>
                <Route exact path='/mybusines' element={<MyBusines/>}/>
                <Route exact path='/product-details/:productId' element={<ProductDetails/>}/>

            </Routes>
        </BrowserRouter>
        
    );
}

export default NavBar;