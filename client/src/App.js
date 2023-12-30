// client/src/App.js
import React from 'react';
import GlobalStyles from 'styles/GlobalStyles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HostingCloudLandingPage from "pages/Hosting/HostingCloudLandingPage.js";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import UploadFile from './components/UploadFile';
import NotFound from './pages/NotFound';
import Pricing from './pages/Pricing';
import './App.css'

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


  return (
  <>
          <ThemeProvider theme={defaultTheme}>
        <GlobalStyles /> 
    <Router>
    
          {/* <Appbar /> */}
                <CssBaseline />
          <div>
            <Routes>

              <Route path="/" exact element={<Navigate to="/dashboard" />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/docs" element={<HostingCloudLandingPage />} />

              <Route path="/dashboard" exact element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route
                path="/upload"
                element={
                  <PrivateRoute>
                    <UploadFile />
                  </PrivateRoute>
                }
              />
              <Route path="/signup" element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>} />

              <Route element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
        
  </>
        
        );
}

        export default App;

