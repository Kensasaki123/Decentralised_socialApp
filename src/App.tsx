import './App.css'; // Optional
import Header from './Components/Header';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import About from "./Components/About"
import Contact from "./Components/Contact"
import Services from "./Components/Services"
import Home from "./Components/Home"
import {  useEffect } from 'react';
import Feed from './Components2/Feed';
import Profile from './Components2/Profile';
import Latest from './Components2/pages/Latest'
import MostPopular from './Components2/pages/MostPopular';
import Trending from './Components2/pages/Trending';
import { useContract } from './context/ContractContext';


function App() {
   
  const navigate = useNavigate();
  const { contract } = useContract();

  const location = useLocation();
  


	useEffect(() => {
  if (contract && location.pathname === "/") {
    navigate("/feed");
  }
}, [contract, navigate, location]);
 


 
  const showHeaderRoutes = ["/", "/about", "/contact", "/services"];
  const shouldShowHeader = showHeaderRoutes.includes(location.pathname);
  

  return (
    <>
      <div className="up-part">
        {shouldShowHeader && <Header />}
       <Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/about' element={<About/>} />
  <Route path='/contact' element={<Contact/>} />
  <Route path='/services' element={<Services/>} />
  <Route
  path='/feed'
  element={
    <Feed
    />
  }>

    <Route path="mostpopular" element={<MostPopular />} />
    <Route path="latest" element={<Latest />} />
    <Route path="trending" element={<Trending />} />
  </Route>
<Route
  path="/profile"
  element={
    <Profile
    />
  }
/>
</Routes>

      </div>
    </>
  );
}

export default App;
