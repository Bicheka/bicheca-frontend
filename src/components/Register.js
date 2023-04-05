import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    axios.post('http://localhost:8080/user/register', formData)
      .then(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
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
        alert('Registration successful!');
      })
      .catch(error => setErrorMessage(error.response.data.message));
  };

  return (
    <div>
      <h2>Register</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Street Address:</label>
          <input type="text" name="streetAddress" value={formData.address.streetAddress} onChange={handleAddressChange} required />
        </div>
        <div>
          <label>Apt:</label>
          <input type="text" name="apt" value={formData.address.apt} onChange={handleAddressChange} />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city" value={formData.address.city} onChange={handleAddressChange} required />
        </div>
        <div>
          <label>Country:</label>
          <input type="text" name="country" value={formData.address.country} onChange={handleAddressChange} required />
        </div>
        <div></div>
        <div>
            <label>Zip Code:</label>
            <input type="number" name="zipCode" value={formData.address.zipCode} onChange={handleAddressChange} required />
        </div>
        <div>
            <label>State:</label>
            <input type="text" name="state" value={formData.address.state} onChange={handleAddressChange} required />
        </div>
        <div>
            <button type="submit">Register</button>
        </div>
        </form>
    </div>
    );
}

export default Register;