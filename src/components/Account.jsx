import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Account(){

    const userInfo = useSelector(state => state.userInfo.userInfo);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        if(userInfo){
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    return (
    <div className="home">
        <h1>Account</h1>
        <h3 id='firstName'>{firstName}</h3>
        <h3 id='lastName'>{lastName}</h3>
        <h3>Email: {email}</h3>
        
    </div>
    );
}

export default Account;