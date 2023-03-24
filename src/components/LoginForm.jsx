import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/authenticate', {
        username,
        password
      });
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      // Redirect the user to the dashboard or the protected route
    } catch (error) {
      console.error(error);
      // Handle the login error
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
