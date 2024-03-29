// client/src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// import UploadFile from './components/UploadFile';
import NotFound from './pages/NotFound';
import Pricing from './pages/Pricing';
import Faq from './pages/Faq';
import './App.css'
import axios from 'axios';
import Checkout from 'pages/Checkout/Checkout';

const defaultTheme = createTheme();


function App() {

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');

    // const isLicensed = localStorage.getItem('isLicensed');
    return isAuthenticated ? children : <Navigate to="/login" />;
  }

  const PublicRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');

    // const isLicensed = localStorage.getItem('isLicensed');
    return !isAuthenticated ? children : <Navigate to="/" />;
  }



  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      return
    }



    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  }, [])



  return (
  <>
          <ThemeProvider theme={defaultTheme}>
    <Router>
                <CssBaseline />
          <div>
            <Routes>
            
            
            
            

              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<Faq />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard/*" exact element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>} />
                /* <Route path="/Checkout" element={
                  <PublicRoute>
                    <Checkout />
                  </PublicRoute>} /> */

              <Route element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
        
  </>
        
        );
}

        export default App;

