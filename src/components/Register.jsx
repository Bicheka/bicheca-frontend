import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import '../css/Register.css';

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
    address: {
      streetAddress: '',
      apt: '',
      city: '',
      country: '',
      zipCode: '',
      state: ''
    }
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(value === undefined || value === null){
      setFormData({...formData});
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    if (value === undefined || value === null) {
      setFormData({ ...formData, address: { ...formData.address } });
    }
    else{
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value
        }
      });
    }
  };

  const handleSubmit = (event) => {
    try {
      event.preventDefault();

      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      axios.post('http://localhost:8080/user/register', formData)
        .then(() => { //then set all the input fields to empty again
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'USER',
            address: {
              streetAddress: '',
              apt: '',
              city: '',
              country: '',
              zipCode: '',
              state: ''
            }
          });
          setErrorMessage('');
          alert('Registration successful! go to your email to verify your account');
        })
        .catch(error => setErrorMessage(error.response.data.message));

      navigate('/login');

    } catch (error) {
        setErrorMessage(error.response.data.message);
    }

  };

  return (
    <div className='register'>
      <h1>Register</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form className ="registerFrom" onSubmit={handleSubmit}>
        <div className='fields'>
        <div className='field'>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
        </div>
        <div className='field'>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
        </div>
        <div className='field'>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className='field'>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div className='field'>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
        </div>
        <div className='field'>
          <label>Street Address:</label>
          <input type="text" name="streetAddress" value={formData.address.streetAddress} onChange={handleAddressChange} required />
        </div>
        <div className='field'>
          <label>Apt:</label>
          <input type="text" name="apt" value={formData.address.apt} onChange={handleAddressChange} />
        </div>
        <div className='field'>
          <label>City:</label>
          <input type="text" name="city" value={formData.address.city} onChange={handleAddressChange} required />
        </div>
        <div className='field'>
          <label>Country:</label>
          <input type="text" name="country" value={formData.address.country} onChange={handleAddressChange} required />
        </div>
        <div className='field'>
            <label>Zip Code:</label>
            <input type="number" name="zipCode" value={formData.address.zipCode} onChange={handleAddressChange} required />
        </div>
        <div className='field'>
            <label>State:</label>
            <input type="text" name="state" value={formData.address.state} onChange={handleAddressChange} required />
        </div>
        </div>
        <div>
            <button type="submit">Register</button>
        </div>
      </form>
      <button className='loginButton' type="button" onClick={() => window.location.href = '/login'}>Login</button>
    </div>
    );
}

export default Register;