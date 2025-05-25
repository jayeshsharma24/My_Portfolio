import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Success from './pages/Success';
import Error from './pages/Error';
import Layout from './components/Shopping/Layout';
import Detail from './pages/Details';
import Shopping from './pages/Shopping';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (

   <BrowserRouter>
    {/* Your Routes and Components */}
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
      <Route path='/' element={<Layout/>}/>
      <Route index element={<Home/>}/>
      <Route path="/Success" element={<Success/>}/>,
      <Route path="/Error" element={<Error/>}/>
      <Route path='/:slug' element={<Detail/>} />
      <Route path='/Shopping' element={<Shopping/>}/>
   </Routes>
   
   </BrowserRouter>

      
  );
};

export default App;
