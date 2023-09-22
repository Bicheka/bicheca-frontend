import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link , Routes, Route} from "react-router-dom";

//css
import '../css/NavBar.scss'

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
import StoreDetails from './StoreDetails';
import AdminStore from './AdminStore';
import CreateProductForm from './CreateProductForm';
//icons


//hook
import useCheckLogin from './hook/useCheckLogin';
import { useSelector } from 'react-redux';
import AdminProductDetails from './AdminProductDetails';


function NavBar(){

    //active button
    const [activeButton, setActiveButton] = useState('');
    // const[isStore , setIsStore] = useState(false);
    // const [isHaburgerClicked, setIsHaburgerClicked] = useState(false);
    // const [classAdded, setClassAdded] = useState('navBarButtons');

    const [isOpen, setIsOpen] = useState(false);


    const location = window.location.pathname;

    const {isLogged} = useCheckLogin();

    const user = useSelector(state => state.userInfo.userInfo);

    const [isStore, setIsStore] = useState(false);

    const handleActiveButton = (button) => {
        setActiveButton(button);
    }


    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const closeNavBar = () => {
        setIsOpen(false);
    }

    const handleNavBarButtonClick = (button) => {
        if(isOpen){
            closeNavBar();
        }
        handleActiveButton(button)
    }

    

    useEffect(() => {

        console.log("NavBar useEffect, user: ", user);
        console.log("isStore::"+isStore);

        handleActiveButton(location.split('/')[1]);//get the first part of the path
        console.log("location: ", location.split('/')[1]);
        if(user){
            if(user.role === "STORE"){
                setIsStore(true);
            }
            else{
                setIsStore(false);
            }
        }
        
    }, [user, isStore, location]);

    return (
        <BrowserRouter forceRefresh = {true}>
            <div className="navBar">

                <div className='navBarLogo'>
                    <Link to = "/">
                        <h2 className='navBarLogoText'>Bicheka</h2>
                    </Link>
                </div>


                <div  className={`navBarButtons ${isOpen ? 'active' : ''}`}>
                    <div className="navBarItem">
                        
                        <Link 
                            to = "/"
                            className={`navBarButton ${activeButton === '' ? 'active' : ''}`}
                            onClick={() => handleNavBarButtonClick('')}
                        >
                            <p className='navBarButtonText'>Mall</p>
                        </Link>
                    
                    </div>
                    <div className="navBarItem">
                        
                            <Link 
                                to = "/products" 
                                className={`navBarButton ${activeButton === 'products' ? 'active' : ''}`}
                                onClick={() => handleNavBarButtonClick('products')}
                            >
                                <p className='navBarButtonText'>Products</p>
                            </Link>
                        
                    </div>

                    {isStore &&
                        <div className="navBarItem">
                        
                            
                                <Link 
                                    to = "/mybusines"
                                    className={`navBarButton ${activeButton === 'mybusines' ? 'active' : ''}`}
                                    onClick={() => handleNavBarButtonClick('mybusines')}
                                >
                                    <p className='navBarButtonText'>My Business</p>
                                </Link>
                            
                        </div>
                    }

                    <div className="navBarItem">
                        
                        <Link 
                            to = "/cart" 
                            className={`navBarButton ${activeButton === 'cart' ? 'active' : ''}`}
                            onClick={() => handleNavBarButtonClick('cart')}
                        >
                            <p className='navBarButtonText'>Cart</p>
                        </Link>
                        
                    </div>
                    <div className="navBarItem">
                        
                            {isLogged ?
                    
                                <Link 
                                to = "/account" 
                                className={`navBarButton ${activeButton === 'account' ? 'active' : ''}`}
                                onClick={() => handleNavBarButtonClick('account')}
                            >
                                <p className='navBarButtonText'>Account</p>
                                </Link> 
                                : //if not logged in show login button
                                <div className="navBarItem">
                                    <Link
                                        to = "/login"
                                        className={`navBarButton ${activeButton === 'login' ? 'active' : ''}`}
                                        onClick={() => handleNavBarButtonClick('login')}
                                    >
                                        <p className='navBarButtonText'>Login/SignUp</p>
                                    </Link>
                                </div>
                            }
                    
                    </div>

                    <div className="navBarItem">
                            <img className='searchIcon' src = "../../search.png" alt='search' />
                    </div>
            
                </div>

                <div className = "hamburger" onClick={toggleNavbar}>
                        <img src='../../hamburger.png' alt="burgerImage"/>
                </div>
            
                
            </div>
            <Routes>
                <Route exact path='/' element = {<Mall/>}/>
                <Route exact path='/products' element={<Products/>}/>
                <Route exact path='/cart' element={<Cart/>}/>
                <Route exact path='/account' element={<Account/>}/>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/register' element={<Register/>}/>
                <Route exact path='/mybusines' element={<MyBusines/>}/>
                <Route exact path='/product-details/:productId' element={<ProductDetails/>}/>
                <Route exact path='/store-details/:storeId' element={<StoreDetails/>}/>
                <Route exact path='/admin-store/:storeId' element={<AdminStore/>}/>
                <Route exact path='/create-product/:storeId' element={<CreateProductForm/>}/>
                <Route exact path='/admin-product-details/:productId' element={<AdminProductDetails/>}/>
            </Routes>
        </BrowserRouter>
        
    );
}

export default NavBar;