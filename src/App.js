import {React, useContext} from 'react';
import HomePage from './pages/homepage/homepage.component';
import {Route, Routes} from "react-router-dom";

import './App.css';
import { UserContext } from './contexts/user.context';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

const App = () =>  {
  const {currentUser} = useContext(UserContext);
  console.log('from App '+ currentUser);
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/shop" element={<ShopPage/>}/>
        <Route path="/signin" element={<SignInAndSignUpPage/>}/>
       </Routes>
    </div>
  );
}

export default App;