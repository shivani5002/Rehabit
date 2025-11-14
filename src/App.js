// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/LandingPage';
import Calendar from './components/Calendar';
import Profile from './components/Profile';
import HybridDashboard from './components/HybridDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route shows Landing page */}
          <Route path="/" element={<Landing />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Other routes */}
          <Route path="/dashboard" element={<HybridDashboard />} />
          
          {/* Redirect any unknown routes to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route 
            path="/calendar" 
            element={<Calendar />} 
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;