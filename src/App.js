import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';

const App = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('jwt_token');
    return !!token;
  };

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Private route, redirect to login if not authenticated */}
        <Route
          path="/home"
          element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
        />

        {/* Redirect to /home if user is authenticated */}
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/" /> : <Navigate to="/login" />}
        />

        {/* Handle 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
