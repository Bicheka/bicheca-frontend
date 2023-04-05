import React, { useState} from 'react';
import "../css/Login.css";
import axios from 'axios';

function Login() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:8080/authenticate', { 
        email,
        password 
      }).then(response => {
        setToken(response.headers.getAuthorization());
        console.log(response);
        console.log(response.headers.getAuthorization());
        
      }).catch(error => {
        console.log(error);
      });


      if (rememberMe) {
        // Set the token in a persistent cookie that expires after 30 days
        const date = new Date();
        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
        document.cookie = `token=${token};expires=${date.toUTCString()}`;
      } else {
        // Set the token in localStorage, which is cleared when the browser is closed
        localStorage.setItem('token', token);
      }
      // console.log("logged in");
      // console.log(token.toString());
     
     
      // const user = await getUserInfo();
      //console.log(user);
      // await getUser();
      //console.log(user);
      // await console.log(getUser());
      // Redirect to home page or some other authorized page
    } catch (error) {
      setError('Invalid email or password');
    }

    const response = await axios.get('http://localhost:8080/user', {
      headers: {
        Authorization: token
      }
    });

    console.log(response.data);

  };

  
  // async function getUser(){
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     return null;
  //   }
  //   await axios.get('http://localhost:8080/user', {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   }).then(response => {
  //     setUser(response.data);
  //     return response.data;
  //   }).catch(error => {
  //     console.log(error);
  //   });
  //

  return (
    <form onSubmit={handleLogin}>
      {error && <div>{error}</div>}
      <label>
        email:
        <input type="text" value={email} onChange={e => setemail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
        Remember me
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;