import { useState, useEffect } from 'react';
import { fetchUser } from '../../service/client';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsLogged } from '../redux/slices/loginSlices';
import {setJwt} from '../redux/slices/jwtSlices';
import { setUserInfo } from '../redux/slices/userInfoSlice';

const useCheckLogin = () => {

  const isLogged = useSelector(state => state.login.isLogged);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  const jwt = useSelector(state => state.jwt.jwt);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []); // Empty dependency array to run this effect only once on component mount

  useEffect(() => {

    const checkLoggedIn = () => {
      console.log("useCheckLogin useEffect, token: ", token);
      if (token) {
        dispatch(setJwt(token));
        dispatch(setIsLogged(true));
      } else {
        setIsLogged(false);
      }
    }

    checkLoggedIn();
    
  }, [token, dispatch]); // Empty dependency array to run this effect only once on component mount

  useEffect(() => {
    console.log("useCheckLogin useEffect, isLogged: ", isLogged);
    console.log("useCheckLogin useEffect, jwt: ", jwt);
    if (isLogged) {
      fetchUser(jwt)
        .then((user) => {
          dispatch(setUserInfo(user));
        })
        .catch((error) => {
          // Handle error while fetching user data
          console.error('Error fetching user data:', error);
        });
    }
  }, [dispatch, isLogged, jwt]); // Run this effect whenever isLogged changes

  return { isLogged };
};

export default useCheckLogin;