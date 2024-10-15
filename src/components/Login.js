import '../css/styles.css'; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('rahul'); // Hard-coded username
  const [password, setPassword] = useState('rahul@2021'); // Hard-coded password
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Set the relevant URL to the login endpoint
  const loginUrl = 'https://apis.ccbp.in/login'; // Use the relative URL

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginDetails = {
      username,
      password,
    };

    try {
      const response = await fetch(loginUrl, { // Use the relative URL here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
      });

      if (!response.ok) {
        // If response is not okay, throw an error
        const errorData = await response.json();
        throw new Error(errorData.error_msg || 'Something went wrong. Please try again.');
      }

      const data = await response.json();
      localStorage.setItem('jwt_token', data.jwt_token);
      navigate('/home'); // Navigate to the home page after successful login
    } catch (error) {
      // Log the error message to the console
      console.error('Fetch Error:', error.message);
      setError(error.message); // Set error message from the caught error
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login to Spotify</h2>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
