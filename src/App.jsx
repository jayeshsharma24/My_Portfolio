import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Success from './pages/Success';
import Error from './pages/Error';
import Layout from './components/Shopping/Layout';
import Detail from './pages/Details';
import Shopping from './pages/Shopping';
import Data from './pages/Data';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <Routes>
        {/* Protected Home Route */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/error" element={<Error />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/data" element={<Data />} />
        <Route path="/:slug" element={<Detail />} />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
