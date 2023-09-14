import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './redux/slices/userInfoSlice';
import { useNavigate } from 'react-router';
import { API_URL } from "./global/GlobalConsts"

function Account(){

    const dispatch = useDispatch();

    const user = useSelector(state => state.userInfo.userInfo);

    const isLogged = useSelector(state => state.login.isLogged);

    const navigate = useNavigate();

    const userInfo = useSelector(state => state.userInfo.userInfo);
    // const isLogged = useSelector(state => state.login.isLogged)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isCreatingStore, setIsCreatingStore] = useState(false);
    const [storeName, setStoreName] = useState('');
    const [logged , setLogged] = useState(false);
    const [token, setToken] = useState('');
    const [storeNameExists, setStoreNameExists] = useState(false);
    
    useEffect(() => {

        console.log("Account useEffect, isLogged: ", isLogged);

        if(user){
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
        }
        if(isLogged){
            setLogged(true);
        }
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
        }
    }, [isLogged, user]);

    const changeCreatingStore = () => {
        setIsCreatingStore(!isCreatingStore);
    }

    const handleCreateStore = async (event) => {
        event.preventDefault();
        const data = { storeName };
        const headers = { Authorization: `Bearer ${token}` };
        try {
            await axios.post(API_URL+'/store/create_store', data, { headers })
            .then(response => {
                if(response.status === 200){
                    setStoreNameExists(false);
                }
                else if(response.status === 409){
                    setStoreNameExists(true);
                }
                else{
                    throw new Error('Something went wrong');
                }
            })
            setIsCreatingStore(false);
            if(userInfo.role !== "STORE"){
                const updatedUserInfo = { ...userInfo, role: "STORE" };
                dispatch(setUserInfo(updatedUserInfo));
            }    

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        // setLogged(false);
        navigate('/login')
        window.location.reload();
    }

    //if is logged show account info if not display not logged in
    return (
        <div>
            <h1>Account</h1>
            {logged ? (
                <div>
                    <h3 id='firstName'>{firstName}</h3> 
                    <h3 id='lastName'>{lastName}</h3>
                    <h3>Email: {email}</h3>
                    {!isCreatingStore && <button className='createStoreButton' onClick={changeCreatingStore}>Create Store</button>}
                    {isCreatingStore && (
                        <form className='createStoreForm' onSubmit={handleCreateStore}>
                            {storeNameExists && <p>Store Name already exists</p>}
                            <input type='text' placeholder='Store Name' value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                            <button type='submit'>Submit</button>
                            <button type='button' onClick={changeCreatingStore}>Cancel</button>
                        </form>
                    )}
                    <button className='logoutButton' onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <h3>Not Logged</h3>
            )}
        </div>
    );
}
export default Account;